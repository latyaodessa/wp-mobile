import {AsyncStorage, StyleSheet} from 'react-native';


export const KEY = "client_config";

export const _storeConfig = async (data) => {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(data));
    } catch (error) {
        console.log("Can not save client config to AsyncStorage " + error);
    }
};


export const _retrieveConfig = async () => {
    try {
        const value = await AsyncStorage.getItem(KEY);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log("Can not retrieve config AsyncStorage " + error);
    }
};


export const _removeConfig = async () => {
    try {
        await AsyncStorage.removeItem(KEY);
    } catch (error) {
        console.log("Can not remove config AsyncStorage " + error);
    }

};


export function nestedassign(target, source) {
    Object.keys(source).forEach(sourcekey=>{
        if (Object.keys(source).find(targetkey=>targetkey===sourcekey) !== undefined && typeof source[sourcekey] === "object") {
            target[sourcekey]=nestedassign(target[sourcekey],source[sourcekey]);
        } else {
            target[sourcekey]=source[sourcekey];
        }
    });
    return target;
}



export const _nestedAssign = (target, source) => {
    Object.keys(source).forEach(sourcekey => {
        if (Object.keys(source).find(targetkey => targetkey === sourcekey) !== undefined && typeof source[sourcekey] === "object") {
            target[sourcekey] = _nestedAssign(target[sourcekey], source[sourcekey]);
        } else {
            target[sourcekey] = source[sourcekey];
        }
    });
    return target;
};

export const _styles = (originStyle, clientStyle) => {
    console.log(originStyle);
    console.log(clientStyle);

    const mergedStyles = nestedassign(Object.create(originStyle), clientStyle);
    console.log(mergedStyles);
    return StyleSheet.create(mergedStyles);
};
