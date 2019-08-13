import RootSiblings from "react-native-root-siblings";
import React from "react";
import DropdownAlert from "react-native-dropdownalert";

export default class Toast {
    durationTime: 1000

    show(options = { title: '', time: 1000, type: 'warn' }) {
        if (typeof options['time'] === "undefined") {
            options['time'] = 1000
        }
        if (typeof options['type'] === "undefined") {
            options['type'] = 'warn'
        }
        this.setDurationTime(options.time)
        switch (options.type) {
            case 'info':
                this.info(options.title)
                break
            case 'warn':
                this.warn(options.title)
                break
            case 'error':
                this.error(options.title)
                break
            default:
                this.info(options.title)
        }
    }

    info(e) {
        this.dropdownAlert("info", "提示", e);
    }

    warn(e) {
        this.dropdownAlert("warn", "警告", e);
    }

    error(e) {
        this.dropdownAlert("error", "错误", e);
    }

    dropdownAlert(type, title, text) {
        const textString = String(text)
        const durationTime = this.durationTime
        new RootSiblings(
            (
                <DropdownAlert
                    ref={ref => {
                        ref && ref.alertWithType(type, title, textString);
                    }}
                    infoColor={'#5bc0de'}
                    warnColor={'#f0ad4e'}
                    closeInterval={durationTime}
                />
            )
        );
    }

    setDurationTime(time) {
        this.durationTime = time
    }
}
