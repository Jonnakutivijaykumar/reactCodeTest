import React from 'react';
const URL = "https://thronesapi.com/api/v2/Characters"

export const getGOTData = () => {
    const data =  fetch(URL).then((res) => res.json());
    return data;
}