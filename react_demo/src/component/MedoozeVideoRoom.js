import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {AudioIcon, AudioOffIcon, VideoIcon, VideoOffIcon} from "../img/svgIcons";
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import TransactionManager from "../lib/TransactionManager";   //'transaction-manager'
import MediaServerClient from '../lib/MediaServerClient'
//import TransactionManager from '../lib/transaction-manager'
let participants;
let pc;
let poster_addr='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554783370112&di=b8e3916534a569ab6c13fcc8b01e9e32&imgtype=0&src=http%3A%2F%2Fimg.17xsj.com%2Fuploads%2Fallimg%2Fc121126%2F1353910E4M0-52Kb.jpg';

class MedoozeVideoRoom extends Component {

    constructor(props){
        super(props);
        this.state={
            localVideoSrc:null,
            videoEnable:true,
            audioEnable:true,
            bitrateValue:100,
            bStartEchoTestButton:false,
        }

        // create a ref to store the video DOM element
        this.localVideo = React.createRef();
        this.remoteVideos=new Array();
        for(var i=0;i<5;i++){
            this.remoteVideos[i]=React.createRef();
        }


        //Get our url
        this.roomId = "1234";
        var myDate = new Date();
        myDate.toLocaleString();
        this.name = myDate.toLocaleString();
        this.nopublish = false;
        //this.pc=null;
        this.url="wss://47.94.235.90:8083";
        this.localStreamID="";
        this.remoteIndex=0;

        this.handleStart=this.handleStart.bind(this);
        this.handleVideoOn=this.handleVideoOn.bind(this);
        this.handleAudioOn=this.handleAudioOn.bind(this);

        this.connect=this.connect.bind(this);
        this.addRemoteTrack=this.addRemoteTrack.bind(this);
        this.removeRemoteTrack=this.removeRemoteTrack.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount(){

    }

    handleVideoOn(){

    }

    handleAudioOn(){

    }

    handleSelectChange = name => event => {

    };

    handleStart(){
        this.connect(this.url, this.roomId, this.name)
    }

    addRemoteTrack(event)
    {
        console.log(event);

        const track	= event.track;
        const stream	= event.streams[0];

        if (!stream)
            return console.log("addRemoteTrack() no stream")
        stream.oninactive = (event)=>console.log(event);

        //Check if video is already present
        this.remoteVideos[this.remoteIndex].current.srcObject=stream;
        //let video = remoteVideos.querySelector("div[id='"+stream.id+"']>video");
        //Check if already present
        //if (video)
        //Ignore
            //return console.log("addRemoteTrack() video already present for "+stream.id);
    }

    removeRemoteTrack(event)
    {
        console.log(event);
        const track	= event.track;
        const stream	= event.streams[0];
        //Check if video is already present
        //看看这个video stream有没有正在播放，如果正在播放，就从remoteVideos里面移除掉
        //记住,react是数据驱动，改了数组自然就给渲染好了
    }

    connect(url,roomId,name)
    {
        var that=this;

        const ws = new WebSocket(url);
        //Crete transaction manager
        const tm = new TransactionManager(ws);
        //Create managed peer connection
        const client = new MediaServerClient(tm);
        //Create room url
        const roomUrl = url +"?id="+roomId;
        //myPeerConnection.onicecandidate = handleICECandidateEvent;
        //myPeerConnection.onremovetrack = handleRemoveTrackEvent;
        //myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
        //myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
        //myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;

        ws.onopen = async function()
        {
            console.log("ws:opened");
            //Create new managed pc
            pc = await client.createManagedPeerConnection("pcg");
            //On new remote tracks
            pc.ontrack	= that.addRemoteTrack;
            pc.ontrackended = that.removeRemoteTrack;
            //现在这里发送试试
            const constraints={
                audio: true,
                video: true
            };
            //let stream = null;
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                stream.getTracks().forEach(async (track) => await pc.addTrack(track,stream));
            } catch(err) {
                console.log(err.toString());
            }
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ padding: 20 }}>
            <Grid container className={classes.container} spacing={8}>
                <Grid item xs={12}>
                    <header >
                        <h1 className="App-title">Medooze Video Room</h1>
                    </header>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={this.handleStart}>
                        {this.state.bStartEchoTestButton?'stop':'start'}
                    </Button>
                </Grid>
                <Grid container justify="center" spacing={8}>
                <Grid item xs={12}>
                    <video className={classes.videoLarge}
                           ref={this.localVideo}
                           id="localVideo"
                           poster={poster_addr}
                           autoPlay="true"/>
                </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="flex-start" spacing={24}>
                        {[0, 1, 2].map(value => (
                            <Grid key={value} item xs={3} zeroMinWidth>
                                <video className={classes.videoSmall}
                                       ref={this.remoteVideos[value]}
                                       id={value}
                                       poster={poster_addr}
                                       autoPlay="true"/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 20,
    },
    container: {
        direction: 'row',
        justify: "center",
        alignItems: 'center',
    },
    gridLayout:{
        justify: "center",
        alignItems: "center",
    },
    videoLarge: {
        paddingTop: 5, // 16:9
        width:'70%',
        height:'90%',
    },
    videoSmall: {
        paddingTop: 1, // 16:9
        width:'100%',
        height:'100%',
        alignItems:"flex-start",
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        height: '1800',
        color: theme.palette.text.secondary,
    },
});

MedoozeVideoRoom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedoozeVideoRoom);




