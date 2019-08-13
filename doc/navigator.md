## 定义路由
/containers/navigator.js里的createStackNavigator方法里
## 页面生命周期
```javascript
// 例如： 在页面显示时，初始化购物车列表
componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            async () => {
                await this.initCartList()
            }
        );
    }
```

## 接收参数
```javascript
const { navigation, defaultAddress } = this.props;
const { cart_buy_items } = navigation.state.params
```

## 跳转
