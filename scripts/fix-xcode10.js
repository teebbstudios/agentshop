var process = require('child_process');
var fs = require('fs');

fs.exists("./node_modules/react-native/third-party/glog-0.3.4", function (exists) {
    if (exists) {

        console.log("检测到glog文件存在，开始移植文件")

        fs.copyFile('./ios-configure-glog.sh', './node_modules/react-native/scripts/ios-configure-glog.sh', (err) => {
            if (err) throw err;
            console.log('已完成文件覆盖，开始执行修复脚本...');

            process.exec('cd ./node_modules/react-native/third-party/glog-0.3.4 && ../../scripts/ios-configure-glog.sh', function (error, stdout, stderr) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }else{
                    console.log('修复完成，请重新build');
                }
            });
        })

    }else{
        console.log('warning: 请先build项目，失败后再执行此脚本')
    }
})




