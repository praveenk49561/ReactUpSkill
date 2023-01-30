import { Button, Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getContinents, getCountries, postData } from '../../Utils/MockApis';
const { Option } = Select;

const counts = {
    fuctionCall: 0,
    useEffectWithNoDependency: 0,
    useEffectWithEmptyArray: 0,
    useEffectWithDependency: 0,
    useFffectWithReturnCallback: 0 // cleanUp
};

const FormF = () => {
    counts.fuctionCall ++;
    console.warn('#### Whole Function Is Being Called FF', counts?.fuctionCall);

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [continent, setContinent] = useState('');
    const [country, setCountry] = useState('');
    const [feedback, setFeedback] = useState('');
    const [countries, setCountries] = useState([]);
    const [continents, setContinents] = useState([]);
    const [fetchingCountries, setFetchingCountries] = useState(false);
    const [fetchingContinents, setFetchingContinents] = useState(false);
    const [postingData, setPostingData] = useState(false);

    // useEffect(async () => {
    //     if (continents?.length === 0) {
    //         setFetchingContinents(true);
    //         const continents = await getContinents();
    //         setContinents(continents);
    //         setFetchingContinents(false);
    //     }
    // }, []);

    useEffect(() => {
        counts.useEffectWithEmptyArray ++;
        console.log('#### useEffect with dependency as empty array FF', counts?.useEffectWithEmptyArray);
        const fetchContinents = async () => {
            if (continents?.length === 0) {
                console.log('#### fetchingContinents state is being updated here');
                setFetchingContinents(true);
                const continents = await getContinents();
                console.log('#### fetchingContinents & continent states are being updated here')
                setContinents(continents);
                setFetchingContinents(false);
            }
        };
        fetchContinents();
    }, []);

    useEffect(() => {
        counts.useEffectWithNoDependency ++;
        console.log('#### useEffect with no dependency FF', counts?.useEffectWithNoDependency);
    });

    // useEffect(async () => {
    //     setFetchingCountries(true);
    //     const countries = await getCountries({ continent });
    //     setCountries(countries)
    //     setFetchingCountries(false);
    // }, [continent]);

    useEffect(() => {
        counts.useEffectWithDependency ++;
        console.log('#### useEffect with dependency FF', counts?.useEffectWithDependency);

        const fetchCountries = async () => {
            console.log('#### fetchingCountries state is being updated here');
            setFetchingCountries(true);
            const countries = await getCountries({ continent });
            console.log('#### fetchingCountries & country states are being updated here')
            setCountries(countries)
            setFetchingCountries(false);
        };

        fetchCountries();
    }, [continent]);

    useEffect(() => {
        return () => {
            counts.useFffectWithReturnCallback ++;
            console.log('#### useEffect with return callback FF', counts?.useFffectWithReturnCallback);
        }
    });


    const onChange = (event, type) => {
        switch (type) {
            case 'name':
                setName(event?.target?.value);
                break;
            case 'mobile no':
                setMobile(event?.target?.value);
                break;
            case 'address':
                setAddress(event?.target?.value);
                break;
            case 'gender':
                setGender(event);
                break;
            case 'continent':
                setContinent(event);
                break;
            case 'country':
                setCountry(event);
                break;
            case 'feedback':
                setFeedback(event?.target?.value);
                break;
            default:
                break;
        }
    };

    const setStateWithInitialValues = () => {
        setName('');
        setMobile('');
        setAddress('');
        setGender('');
        setContinent('');
        setCountry('');
        setFeedback('');
        setCountries([]);
        setContinents([]);
        setFetchingCountries(false);
        setFetchingContinents(false);
        setPostingData(false);
    }

    const onSubmitData = () => {
        console.log('#### postingData state is being updated here');
        setPostingData(true);

        const payload = {
            name,
            address
        };

        postData(payload)?.then((e) => {
            if (e?.status === 200) {
                alert(e?.message);
                console.log('#### whole state is being reseted here');
                setStateWithInitialValues();
            }
        })
    }

    const onResetData = () => {
        console.log('#### whole state is being reseted here');
        setStateWithInitialValues();
        
    };


    const isLoading = fetchingContinents || fetchingCountries || postingData;

    return (
        <div className='feedback-form'>
            <Spin tip="Please wait for a moment, we are fetching required things." size="medium" spinning={isLoading}>
                <div className='form'>
                    {/* NAME */}
                    <div style={{ margin: 10 }}>
                        <div>Name:</div>
                        <Input  onChange={(event) => { onChange(event, 'name') }}  style={{ width: '100%', fontFamily: 'inherit' }}/>
                    </div>

                    {/* ADDRESS */}
                    <div style={{ margin: 10 }}>
                        <div>Mobile No:</div>
                        <Input onChange={(event) => { onChange(event, 'mobile no') }}  type='number' style={{ width: '100%', fontFamily: 'inherit' }}/>
                    </div>

                    {/* ADDRESS */}
                    <div style={{ margin: 10 }}>
                        <div>Address:</div>
                        <Input.TextArea onChange={(event) => { onChange(event, 'address') }}  style={{ width: '100%', fontFamily: 'inherit' }}/>
                    </div>

                    {/* GENDER */}
                    <div style={{ margin: 10 }}>
                        <div>Gender:</div>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={(event) => { onChange(event, 'gender') }} 
                            allowClear
                            style={{ width: '100%', fontFamily: 'inherit' }}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </div>

                    {/* CONTINENT */}
                    <div style={{ margin: 10 }}>
                        <div>Continent:</div>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={(event) => { onChange(event, 'continent') }} 
                            allowClear
                            style={{ width: '100%', fontFamily: 'inherit' }}
                        >
                            {continents?.map((ec) => <Option key={ec} value={ec}>{ec}</Option>)}
                        </Select>
                    </div>

                    {/* Country */}
                    <div style={{ margin: 10 }}>
                        <div>Country:</div>
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={(event) => { onChange(event, 'country') }} 
                            allowClear
                            style={{ width: '100%', fontFamily: 'inherit' }}
                        >
                            {countries?.map((ec) => <Option key={ec} value={ec}>{ec}</Option>)}
                        </Select>
                    </div>

                    {/* Feedback */}
                    <div style={{ margin: 10 }}>
                        <div>Feedback:</div>
                        <Input.TextArea onChange={(event) => { onChange(event, 'feedback') }}  style={{ width: '100%', fontFamily: 'inherit' }}/>
                    </div>

                    {/* BUTTONS */}
                    <div style={{ margin: '50px 10px 10px 10px' }}>
                        <Button style={{ margin: '5px', fontFamily: 'inherit' }} htmlType="button" onClick={onSubmitData}> Submit </Button>
                        <Button style={{ margin: '5px', fontFamily: 'inherit' }} htmlType="button" onClick={onResetData}> Reset </Button>
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default FormF;