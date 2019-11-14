import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const CONSTANTS = {
    toValue:100,
    duration:1000,
}
class ProgressBar extends Component {
    state = { 
        animatedScale: new Animated.Value(0),
        progressStatus: 0,
        disableButton:  false,
     }

     setAnimation = () => {
        return { toValue:CONSTANTS.toValue, duration:CONSTANTS.duration, useNativeDriver:true}
     }

     setInterpolation = () => {
         return {inputRange:[0,100], outputRange:[0, 1]}
     }

     setAnimatedInterpolation = (interpolateScale) => {
         return {transform:[{
             scaleX:interpolateScale
         }]}
     }
     showProgress = () => {
         this.state.animatedScale.addListener(({value}) => {
             this.setState({progressStatus:value})
         })
     }
     handleProgressBar = () => {
         const { animatedScale } = this.state;
         animatedScale.setValue(0);
         this.setState({disableButton:true}, () => {  
         Animated.timing(animatedScale, this.setAnimation()).start( () => {
         this.setState({disableButton:false})
         animatedScale.removeAllListeners()
         });
         this.showProgress();})
     }

    render() { 
        const { animatedScale, progressStatus } = this.state;
        const interpolatedScale = animatedScale.interpolate(this.setInterpolation());

        const animatedStyle = this.setAnimatedInterpolation(interpolatedScale);
        return (
            <View style={{justifyContent:'center', alignItems:'center',}}> 
            <Text style={{position:'absolute', top:5, zIndex:1, color:'white'}}>
            {`${Math.floor(progressStatus)}%`}
            </Text>
            <Animated.View style={[{ 
                width:width, 
                height:30,
                backgroundColor:'red',
                borderColor:'black',
                borderRadius:100,
                marginBottom:20,
                opacity:0.8
                }, 
                animatedStyle]} >
                
            </Animated.View>
             
       
            <TouchableOpacity  
            style={{borderColor:'black', 
            borderWidth:1, 
            borderRadius:100,
            padding:10
            }} 
            disabled={this.state.disableButton}
            onPress={this.handleProgressBar}>
                <Text>
                    Press Me!
                </Text>
            </TouchableOpacity>
            </View>
         );
    }
}
 
export default ProgressBar;