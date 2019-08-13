import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import ProgressImage from 'react-native-image-progress';

export default class ThemeImage extends PureComponent {
    render() {
        const {
            source,
            errImg = require('../../images/fetchStatus/networkImageError.png')
        } = this.props
        if (!source || !source.uri){
            return (
                <Image
                    {...this.props}
                    resizeMode={'cover'}
                    source={errImg}
                />
            )
        }
        return (
            // <ProgressImage
            //     animationType='decay'
            //     // animationType='timing'
            //     // animationType='spring'
            //     renderError={() => {
            //         return (
            //             <StatusView
            //                 image={errImg}
            //             />
            //         )
            //     }}
            //     {...this.props}
            // />
            <ProgressImage
                animationType='decay'
                // renderIndicator={()=>{
                //     return (
                //         <StatusView
                //             image={require('../../images/fetchStatus/image-loading.png')}
                //         />
                //     )
                // }}
                renderError={()=>{
                    return (
                        <StatusView
                            image={errImg}
                        />
                    )
                }}
                {...this.props}
            />
        );
    }
}



class StatusView extends PureComponent {
    render() {
        const {
            image
        } = this.props
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <Image
                    source={image}
                    style={{
                        height: '80%',
                        width: '80%',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );
    }
}
