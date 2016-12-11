/**
 * Created by linhao on 2016/12/11.
 */
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableHighlight,
    Image,
    BackAndroid,
    ToastAndroid
} from 'react-native'
import React, {Component} from 'react';
import DataRepositor from '../utils/DataRepositor';
import Video from 'react-native-video'
//var WINDOW_WIDTH = Dimensions.get('window').width;
//var WINDOW_HEIGHT = Dimensions.get('window').height;
export default class MovieView extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.repositor = new DataRepositor();
        this.state = {
            load: false,
            error: '',
            data: {
                url: ''
            }
        };
    }
    componentWillUnMount() {
        this.setState({
            load: false,
            error: '',
            data: {
                url: ''
            }
        });
    }

    componentDidMount() {
        this.getData();
        var {navigator} = this.props;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (navigator == null) {
                return false;
            }
            if (navigator.getCurrentRoutes().length === 1) {
                return false;
            }
            navigator.pop();
            return true;
        });
    }

    getData() {
        this.repositor.queryMovie(this.props.movieNum, this.props.pageNum).then((responseData) => {
            this.setState({
                load: true,
                error: '',
                data: {
                    url: responseData[0].vedioAddress
                }
            })
        }).catch((error) => {
            this.setState({
                error: error
            })
        }).done();
    }

    render() {
        return (
            <View style={style.contain}>
                <Text style={style.titlestyle}>
                    {this.props.title}
                </Text>
                <Video
                    style={style.backgroundVideo}
                    resizeMode='cover'
                    muted={false}
                    paused={false}
                    volume={1.0}
                    rate={1.0}
                    source={{uri:this.state.data.url}}
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    titlestyle: {
        fontSize: 20,
        color: 'black',
        justifyContent: 'center',
        marginLeft: 20
    },
    backgroundVideo: {
        position: 'absolute',
        width: 400,
        height: 600,
        backgroundColor: 'gray'
    }
})
