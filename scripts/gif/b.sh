#!/bin/sh

if [ ! -f "$2" ]; then
    ~/Downloads/yt-dlp_linux -f "bestvideo[ext=mp4]" $@
fi
