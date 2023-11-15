# fakeBili
用vue3按照bilibili网页布局和功能写的网站，正在完成中  
fakeBiliServer是配套的服务器,把build生成的dist目录直接放进去即可运行  
使用了mysql作为数据库
视频使用了ffmpeg进行dash处理，使用dashjs播放，命令格式如下
ffmpeg -i 1.mp4 -an -init_seg_name '1_init-stream$RepresentationID$.m4s' -media_seg_name '1_chunk-stream$RepresentationID$-$Number%05d$.m4s' -c:v av1_nvenc -f dash ./pre/1.mpd 