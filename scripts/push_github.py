#!/usr/bin/env python3
"""Push all files to GitHub via API (bypassing git protocol issues on iSH)."""
import os, sys, json, base64, requests, time

REPO = "hvrrgfe/ai-thesis-animation"
TOKEN = os.environ.get("GITHUBTOKEN", "")
PROJECT_DIR = "/var/minis/workspace/ai-thesis-animation"

# Skip files
SKIP = {"node_modules", ".git", "out", "__pycache__"}

API = f"https://api.github.com/repos/{REPO}"
HEADERS = {
    "Authorization": f"token {TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}

def collect_files(base_dir):
    """Walk project dir and collect (relative_path, full_path) for all files."""
    files = []
    for root, dirs, filenames in os.walk(base_dir):
        # Remove skipped dirs in-place
        dirs[:] = [d for d in dirs if d not in SKIP]
        for fn in filenames:
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, base_dir)
            files.append((rel, full))
    return sorted(files)

def create_blob(filepath, max_retries=3):
    """Create a git blob via API. Returns SHA."""
    with open(filepath, "rb") as f:
        content = f.read()
    
    encoded = base64.b64encode(content).decode("utf-8")
    
    for attempt in range(max_retries):
        try:
            resp = requests.post(
                f"{API}/git/blobs",
                headers=HEADERS,
                json={"content": encoded, "encoding": "base64"},
                timeout=180
            )
            if resp.status_code in (200, 201):
                return resp.json()["sha"]
            else:
                print(f"  (attempt {attempt+1}: {resp.status_code})", end="")
        except Exception as e:
            print(f"  (retry {attempt+1}: {type(e).__name__})", end="")
            time.sleep(3)
    print(f" ERROR blob {filepath}: {resp.status_code if 'resp' in dir() else 'timeout'}")
    return None

def main():
    files = collect_files(PROJECT_DIR)
    print(f"Found {len(files)} files to upload")
    
    # Step 0: Initialize repo with a README via Contents API (required for empty repos)
    print("Initializing repo with README via Contents API...")
    readme_path = None
    for rel, full in files:
        if rel == "README.md":
            readme_path = full
            break
    
    if readme_path:
        with open(readme_path, "r") as f:
            readme_content = f.read()
        resp = requests.put(
            f"{API}/contents/README.md",
            headers=HEADERS,
            json={
                "message": "Initial commit: README",
                "content": base64.b64encode(readme_content.encode()).decode(),
            },
            timeout=60
        )
        if resp.status_code in (200, 201):
            print("  README created, repo initialized")
        else:
            print(f"  WARNING: README creation returned {resp.status_code}: {resp.text[:200]}")
        time.sleep(1)
    
    # Step 1: Create blobs for all files
    tree_items = []
    for i, (rel, full) in enumerate(files):
        size = os.path.getsize(full)
        print(f"[{i+1}/{len(files)}] Uploading: {rel} ({size} bytes)...", end=" ")
        sha = create_blob(full)
        if sha:
            print("OK")
            mode = "100755" if os.access(full, os.X_OK) else "100644"
            tree_items.append({
                "path": rel,
                "mode": mode,
                "type": "blob",
                "sha": sha
            })
        else:
            print("FAILED")
        time.sleep(0.1)
    
    print(f"\nUploaded {len(tree_items)}/{len(files)} blobs")
    
    if not tree_items:
        print("No files uploaded, aborting")
        return
    
    # Step 2: Create tree
    print("Creating tree...")
    resp = requests.post(
        f"{API}/git/trees",
        headers=HEADERS,
        json={"tree": tree_items},
        timeout=120
    )
    if resp.status_code not in (200, 201):
        print(f"ERROR creating tree: {resp.status_code} {resp.text[:300]}")
        return
    tree_sha = resp.json()["sha"]
    print(f"Tree created: {tree_sha}")
    
    # Step 3: Create commit
    print("Creating commit...")
    commit_msg = """feat: 当预测被外包，人当何为 - Remotion科普动画

- 11个场景组件（概念定义→论点→结论→互动）
- 扁平MG动画风格，1920x1080，10分钟
- 12个Mixkit免版权音效 + 2首BGM
- GitHub Actions自动渲染
- 无配音，纯文字+视觉+音频"""
    
    # Check if there's an existing commit to use as parent
    parent_sha = None
    try:
        resp_ref = requests.get(f"{API}/git/refs/heads/main", headers=HEADERS, timeout=30)
        if resp_ref.status_code == 200:
            parent_sha = resp_ref.json()["object"]["sha"]
            print(f"Found parent commit: {parent_sha}")
    except:
        pass
    
    commit_data = {
        "message": commit_msg,
        "tree": tree_sha,
    }
    if parent_sha:
        commit_data["parents"] = [parent_sha]
    
    resp = requests.post(
        f"{API}/git/commits",
        headers=HEADERS,
        json=commit_data,
        timeout=120
    )
    if resp.status_code not in (200, 201):
        print(f"ERROR creating commit: {resp.status_code} {resp.text[:300]}")
        return
    commit_sha = resp.json()["sha"]
    print(f"Commit created: {commit_sha}")
    
    # Step 4: Update ref
    print("Updating main branch...")
    resp = requests.patch(
        f"{API}/git/refs/heads/main",
        headers=HEADERS,
        json={"sha": commit_sha, "force": True},
        timeout=60
    )
    if resp.status_code in (200, 201):
        print(f"SUCCESS! Pushed to main: https://github.com/{REPO}")
    else:
        print(f"ERROR updating ref: {resp.status_code} {resp.text[:300]}")

if __name__ == "__main__":
    main()
