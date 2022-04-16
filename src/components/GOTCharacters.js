import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";
import { List, Avatar } from 'react-native-paper';
import { Alert } from 'react-native-web';
import { getGOTData } from '../DataApi';
import { Styles } from './Styles';
import _ from 'lodash'

function GOTCharacters() {
    //list data
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getGOTData().then((res) => {
            console.log("success");
            if (res) {
                //modifying api object  to  section list 
                let loData = res;
                let filteredData = loData.map((eachObj) => {
                    let fdata = _.filter(loData, { 'family': eachObj.family })
                    const obj = {
                        title: eachObj.family,
                        data: fdata
                    }
                    return obj
                })
                setList(filteredData)
                setLoading(false)
            } else {
                setLoading(false)
                console.log("res");
            }

        }).catch((err) => {
            setLoading(false)
            Alert.alert("Network Error")
        })
    }, []);

    if (loading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text >Loading...</Text>
            </View>

        )

    } else {

        return (
            <SafeAreaView>
                <View style={Styles.container}>

                    <SectionList
                        sections={list}
                        keyExtractor={(item, index) => item + index}
                        extraData={list}
                        renderItem={({ item }) => (
                            // <View style={{ marginVertical: 5 }}>

                                <List.Item
                                    title={item.fullName}
                                    description={item.title}
                                    right={props => <Avatar.Image size={50} source={{ uri: item.imageUrl }} />}
                                />
                            // </View>
                        )}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={Styles.header}>{title}</Text>
                        )}
                    />
                </View>
            </SafeAreaView>
        );

    }

};

export default GOTCharacters;
