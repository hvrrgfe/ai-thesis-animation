#!/bin/sh
# 生成音效和背景音乐
# 使用 ffmpeg 合成简单音频（CC0，无版权问题）

AUDIO_DIR="/var/minis/workspace/ai-thesis-animation/public/audio"
mkdir -p "$AUDIO_DIR"

# --- BGM: 低频氛围电子乐（循环，3分钟）---
# 叠加多个正弦波形成和声氛围
ffmpeg -y -f lavfi -i "
  sine=frequency=110:duration=180,
  sine=frequency=165:duration=180,
  sine=frequency=220:duration=180
" -filter_complex "
  [0:a]volume=0.3[a1];
  [1:a]volume=0.2[a2];
  [2:a]volume=0.15[a3];
  [a1][a2][a3]amix=inputs=3:duration=longest[mix];
  [mix]aecho=0.6:0.3:500:0.3,tremolo=f=0.5:d=0.3,
  lowpass=f=800,
  volume=0.5
" -ac 2 -ar 44100 -t 180 "$AUDIO_DIR/bgm.mp3" 2>&1 | tail -3
echo "BGM done"

# --- SFX: 清脆提示音 "叮" ---
ffmpeg -y -f lavfi -i "sine=frequency=1200:duration=0.15" -af "volume=0.5,afade=t=out:st=0.08:d=0.07" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_ding.mp3" 2>&1 | tail -1
echo "ding done"

# --- SFX: 过渡滑音 "嗖" ---
ffmpeg -y -f lavfi -i "sine=frequency=400:duration=0.3" -af "volume=0.4,afade=t=out:st=0.15:d=0.15,vibrato=f=8:d=0.5,highpass=f=200" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_whoosh.mp3" 2>&1 | tail -1
echo "whoosh done"

# --- SFX: 数据冲击 "嘭" ---
ffmpeg -y -f lavfi -i "sine=frequency=80:duration=0.4" -af "volume=0.6,afade=t=out:st=0.15:d=0.25,bass=g=5:f=100" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_boom.mp3" 2>&1 | tail -1
echo "boom done"

# --- SFX: 强调上升音 ---
ffmpeg -y -f lavfi -i "sine=frequency=600:duration=0.3" -af "volume=0.4,afade=t=in:st=0:d=0.05,afade=t=out:st=0.2:d=0.1" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_emphasis.mp3" 2>&1 | tail -1
echo "emphasis done"

# --- SFX: 打字点击 ---
ffmpeg -y -f lavfi -i "sine=frequency=2000:duration=0.04" -af "volume=0.3,afade=t=out:st=0.02:d=0.02" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_click.mp3" 2>&1 | tail -1
echo "click done"

# --- SFX: 负面警示音 ---
ffmpeg -y -f lavfi -i "sine=frequency=200:duration=0.5" -af "volume=0.4,afade=t=out:st=0.3:d=0.2,tremolo=f=4:d=0.5" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_warn.mp3" 2>&1 | tail -1
echo "warn done"

# --- SFX: 结尾收束音 ---
ffmpeg -y -f lavfi -i "sine=frequency=523:duration=0.8" -af "volume=0.4,afade=t=out:st=0.5:d=0.3,aecho=0.5:0.3:300:0.3" -ac 2 -ar 44100 "$AUDIO_DIR/sfx_resolve.mp3" 2>&1 | tail -1
echo "resolve done"

echo "=== All audio generated ==="
ls -la "$AUDIO_DIR/"
