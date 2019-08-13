import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux'
import {
	PublicStyles, ThemeStyle,
} from '../../utils/style';
import { InputItem } from 'antd-mobile-rn';
import { Button } from "../../components/theme";
import { Toast } from "../../utils/function";
import { CountdownButton } from "../../utils/view";

@connect(
	({ app: { user: {
		userInfo,
	} } }) => ({
		userInfo,
	}),
	{
		changePhone
	}
)

export default class UserChangePhone extends Component {
	state = {
		stepOne: true,
		old_smscode: null,
		new_smscode: null,
		new_phone: null,
	}
	render() {
		const { old_smscode, new_smscode, new_phone, stepOne } = this.state;
		const { userInfo } = this.props;

		return (
			<SafeAreaView style={{ flex: 1, justifyContent: "space-between", backgroundColor: "#ffffff" }}>
				{
					stepOne ?
						<View style={PublicStyles.ViewOut}>
							<View style={styles.Viewtop}>
								<Text style={styles.currentPhone}>{userInfo.phone}</Text>
								<Text style={styles.nowPhone}>当前手机号</Text>
								<Text style={styles.botInfo}>更换手机号后，可使用新手机号登录</Text>
							</View>
							<InputItem
								style={styles.inputheight}
								placeholder="请输入验证码"
								value={old_smscode}
								extra={(
									<CountdownButton
										api={'SENDOLDPHONESMS'}
										getData={(e) => {
											if (e.code === 0) {
												Toast.info('验证码已发送')
											} else {
												Toast.warn(e.errmsg)
											}
										}}
										style={{
											borderWidth: 0,
										}}
									/>
								)}
								onChange={(old_smscode) => {
									this.setState({
										old_smscode
									})
								}}
							>
								验证码
                        </InputItem>
						</View> :
						<View style={PublicStyles.ViewOut}>
							<InputItem
								style={styles.inputheight}
								placeholder="请输入新手机号"
								value={new_phone}
								onChange={(new_phone) => {
									this.setState({
										new_phone
									})
								}}
								extra={(
									<CountdownButton
										api={'REPLACNEWPHONE'}
										getParams={() => {
											return {
												phone: new_phone
											}
										}}
										getData={(e) => {
											if (e.code === 0) {
												Toast.info('验证码已发送')
											} else {
												Toast.warn(e.errmsg)
											}
										}}
										style={{
											borderWidth: 0,
										}}
									/>
								)}
							>
								新手机号
                        </InputItem>
							<InputItem
								style={styles.inputheight}
								value={new_smscode}
								placeholder="请输入验证码"
								onChange={(new_smscode) => {
									this.setState({
										new_smscode
									})
								}}
							>
								验证码
                        </InputItem>
						</View>
				}
				<Button
					type='primary'
					style={{
						marginBottom: 15,
						marginHorizontal: 15,
						borderWidth: 0,
					}}
					disabled={(stepOne && !old_smscode) || (!stepOne && !new_phone && !new_smscode)}
					onClick={() => {
						if (stepOne) {
							this.setState({
								stepOne: false
							})
						} else {
							this.submit()
						}
					}}
				>
					{
						stepOne ? "下一步" : "确认更换"
					}
				</Button>
			</SafeAreaView>
		)
	}
	submit() {
		const { old_smscode, new_smscode, new_phone } = this.state;
		const { changePhone, navigation } = this.props;
		changePhone({
			params: {
				old_smscode,
				new_smscode,
				new_phone
			},
			navigation
		});
	}
}

const styles = StyleSheet.create({
	Viewtop: {
		backgroundColor: "#F8F8F8",
		paddingVertical: 21,
		alignItems: 'center',
	},
	currentPhone: {
		color: ThemeStyle.ThemeColor,
		fontSize: 18,
	},
	nowPhone: {
		color: "#333333",
		marginVertical: 10,
	},
	botInfo: {
		fontSize: 12,
		color: '#999999',
	},
	inputheight: {
		height: 55,
	}
})
