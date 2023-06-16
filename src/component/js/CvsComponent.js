import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

function CvsComponent() {
    const [cvsData, setCvsData] = useState([]);
    const [cvsType, setCvsType] = useState('GS25');
    const [cvsSale, setCvsSale] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 초기 데이터를 불러옵니다.
        getCvsData();
    }, []);

    useEffect(() => {
        // cvsData가 변경되거나 cvsType, cvsSale이 변경될 때마다 필터링을 수행합니다.
        filterData();
    }, [cvsData, cvsType, cvsSale]);

    const getCvsData = () => {
        // 서버로부터 데이터를 가져오는 비동기 함수를 호출합니다.
        // ...
        fetch('http://localhost:8181/contents/cvs')
            .then((response) => response.json())
            .then((data) => {
                setCvsData(data);
                console.log('데이터 전송 완료');
            })
            .catch((error) => {
                console.error('Error fetching CVS data:', error);
            });
    };

    const handleCvsTypeChange = (selectedCvsType) => {
        setCvsType(selectedCvsType);
    };

    const handleCvsSaleFilter = (selectedCvsSale) => {
        setCvsSale(selectedCvsSale);
    };

    const filterData = () => {
        let filtered = cvsData;

        // 편의점 타입 필터링
        filtered = filtered.filter((item) => item.cvs === cvsType);

        // 세일 필터링
        if (cvsSale) {
            filtered = filtered.filter((item) => item.sale === cvsSale);
        }

        setFilteredData(filtered);
    };

    const Row = ({ index, style }) => {
        const item = filteredData[index];
        return (
            <div style={style}>
                <li key={index}>{item.title}</li>
            </div>
        );
    };

    return (
        <div>
            <div>
                <button onClick={() => handleCvsTypeChange('GS25')}>GS25</button>
                <button onClick={() => handleCvsTypeChange('CU')}>CU</button>
                <button onClick={() => handleCvsTypeChange('7-eleven')}>7-eleven</button>
                {/* 다른 편의점 버튼들도 추가할 수 있습니다 */}
            </div>
            <div>
                <button onClick={() => handleCvsSaleFilter(null)}>전체</button>
                <button onClick={() => handleCvsSaleFilter('1+1')}>1+1</button>
                <button onClick={() => handleCvsSaleFilter('2+1')}>2+1</button>
                {/* 다른 상품 분류 버튼들도 추가할 수 있습니다 */}
            </div>
            <div>
                <h2>{cvsType} 편의점 상품 목록</h2>
                {filteredData.length === 0 ? (
                    <div>해당 조건에 맞는 상품이 없습니다.</div>
                ) : (
                    <List height={400} itemCount={filteredData.length} itemSize={50} width={300}>
                        {Row}
                    </List>
                )}
            </div>
        </div>
    );
}

export default CvsComponent;