## Streaming方案
将其他数据源推送到浏览器，支持一下格式
+ 文件
+ RTP
+ 组播
+ RTSP


### RTP方案介绍
#### 产生RTP的方式
##### GStreamer
```shell
// RTMP转换RTP
gst-launch-1.0 -v  rtmpsrc location=rtmp://172.17.229.3/live/123 ! flvdemux ! h264parse ! rtph264pay config-interval=-1 pt=108 !  udpsink host=172.229.3 port=5004

// 纯RTP
gst-launch-1.0 videotestsrc is-live=true ! video/x-raw,format=I420,framerate=15/1 ! x264enc aud=false bframes=0 speed-preset=veryfast key-int-max=15 ! video/x-h264,stream-format=byte-stream,profile=baseline ! h264parse ! rtph264pay config-interval=-1  pt=100 ! udpsink host=172.17.229.3 port=5004
```
##### FFMpeg
```shell
// RTMP转换RTP
ffmpeg -fflags nobuffer -i rtmp://61.50.117.210:1935/live/cameraGB34020000001320000011_34020000001310000001 -vcodec copy -an -bsf:v h264_mp4toannexb -f rtp -payload_type 100 rtp://172.17.229.3:5004

```

#### 添加任务
##### 配置文件
通过修改配置文件启动服务即可。
##### API方法
+ 修改配置文件
    ```shell
    // 打开配置文件
    vim conf/janus.plugin.streaming.jcfg
    // 设置管理员权限密码
    admin_key = "supersecret" 
    ```
+ 发送命令
参考POSTMAN模板，过程过于负载，需要创建一些与通宵相关的命令，其实根本用不到。

### 前端代码　
使用html/streamingtest.html即可

### 参考资料
+ [Streaming分析](https://blog.csdn.net/cgs1999/article/details/95085038)