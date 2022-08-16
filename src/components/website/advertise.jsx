import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
function Advertise() {
    const mediaEndMoint = process.env.REACT_APP_MediaEndPoint;
    const apiEndPoint = process.env.REACT_APP_APIEndPoint;
    const [index, setIndex] = useState(0);
    const [dataList, setDataList] = useState([]);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        const getData = async () => {
            await axios.get(apiEndPoint + 'Advertise/DisplayAll').then(response => {
                setDataList(response.data)
            });
        };
        getData();
    }, [apiEndPoint]);
    return (
        <div >
            <Carousel activeIndex={index} onSelect={handleSelect}  >
                {dataList.map(item =>
                    <Carousel.Item key={item.AdvertiseId}>
                        <img className="img-thumbnail d-block w-100" width="500" height="400" src={mediaEndMoint + 'Advertise/' + item.Photo} alt={item.Title} />
                    </Carousel.Item>)}
            </Carousel>
        </div>
    );
}
export default Advertise;