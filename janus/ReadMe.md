## Janus官方版本

### 编译
我们使用Docker进行编译和运行
```shell
cd janus_oe
make        # 生成镜像docker-registry.dhc:5000/janus-webrtc-gateway
make run    # 以默认配置文件运行
```

### 运行
```shell
# /usr/local/etc/janus
# /usr/local/lib/janus/transports
# /usr/local/lib/janus/plugins

# 将janus_conf.tar.gz配置文件放置到/opt/janus/conf
# 修改配置文件同时在后台运行
docker run --net=host \
    -v /opt/janus/conf:/usr/local/etc/janus \
    --name="janus"  \
    -itd -t docker-registry.dhc:5000/janus-webrtc-gateway
```

###　插件
+ [streaming方案](./streaming/ReadMe.md)