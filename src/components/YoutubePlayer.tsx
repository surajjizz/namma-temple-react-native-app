// import * as React from 'react';
// import { View } from 'react-native';
// import { Button } from './index';
// import YoutubeFrame from "react-native-youtube-iframe";
// import { Dimensions } from "react-native";
// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// interface IProps {
//     playId: string
//     route: any
// }

// interface IState {
//     isPlaying: boolean
// }

// export default class YoutubePlayer extends React.Component<IProps, IState>{
//     videoId: string;
//     constructor(props: any) {
//         super(props);
//         this.videoId = '';
//         this.state = {
//             isPlaying: false
//         }
//     }

//     componentDidMount() {
//         if (this.props.route && this.props.route.params && this.props.route.params.videoId) {
//             this.videoId = this.props.route.params.videoId;
//         }
//         this.setState({});
//     }

//     onTogglePlay = () => {
//         this.setState({ isPlaying: !this.state.isPlaying });
//     }

//     onVideoStateChange = (state: any) => {
//         if (state === 'playing') {
//             this.setState({ isPlaying: true });
//         } else if (state === 'paused') {
//             this.setState({ isPlaying: false });
//         }
//     }

//     render() {
//         return (
//             <View>
//                 {(this.videoId != undefined && this.videoId != '') &&
//                     <View>
//                         <YoutubeFrame
//                             height={300}
//                             width={SCREEN_WIDTH}
//                             play={this.state.isPlaying}
//                             videoId={this.videoId}
//                             onChangeState={this.onVideoStateChange}
//                         />
//                         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                             <Button title={this.state.isPlaying ? "Pause" : "play"}
//                                 onPress={this.onTogglePlay} />
//                         </View>
//                     </View>
//                 }
//             </View>
//         )
//     }
// }
