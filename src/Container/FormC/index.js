import { Component } from "react";
import { Button, Input, Select, Spin } from 'antd';
import { getContinents, getCountries, postData } from "../../Utils/MockApis";
const { Option } = Select;

const counts = {
    constructor: 0,
    componentDidMount: 0,
    componentDidUpdate: 0,
    componentWillUnmount: 0,
    render: 0
}

class FormC extends Component {
    constructor (props) {
        counts.constructor ++;
        console.log('#### constructor FC', counts?.constructor);
        super(props);
        this.initialState = {
            name: '',
            mobile: 0,
            address: '',
            gender: '',
            continent: '',
            country: '',
            feedback: '',
            countries: [],
            continents: [],
            fetchingCountries: false,
            fetchingContinents: false,
            postingData: false,
        }
        this.state = {
            ...this?.initialState
        };
    };

    componentDidMount = async () => {
        counts.componentDidMount ++;
        console.log('#### componentDidMount FC', counts.componentDidMount);
        const { continents } = this?.state;
        if (continents?.length === 0) {
            console.log('#### fetchingContinents state is being updated here');
            this?.setState({
                fetchingContinents: true
            });
            const continents = await getContinents();
            console.log('#### fetchingContinents & continent states are being updated here')
            this?.setState({
                continents,
                fetchingContinents: false
            })
        }
    };

    componentDidUpdate = async (prevProps, prevState) => {
        counts.componentDidUpdate ++;
        console.log('#### componentDidUpdate FC', counts.componentDidUpdate);
        console.log('#### componentDidUpdate FC prevProps');
        console.log(prevProps);
        console.log('#### componentDidUpdate FC prevState');
        console.log(prevState);

        const { continent } = this?.state;
        if (prevState?.continent !== continent) {
            console.log('#### fetchingCountries state is being updated here');
            this?.setState({
                fetchingCountries: true
            });
            console.log('#### fetchingCountries & country states are being updated here');
            const countries = await getCountries({ continent });
            this?.setState({
                countries,
                fetchingCountries: false
            })
        }
    };

    componentWillUnmount = () => {
        counts.componentWillUnmount ++;
        console.log('#### componentWillUnmount FC', counts.componentWillUnmount);
    }

    onChange (event, type) {
        const updatableObj = {};

        switch (type) {
            case 'name':
                updatableObj.name = event?.target?.value;
                break;
            case 'mobile no':
                updatableObj.mobile = event?.target?.value;
                break;
            case 'address':
                updatableObj.address = event?.target?.value;
                break;
            case 'gender':
                updatableObj.gender = event;
                break;
            case 'continent':
                updatableObj.continent = event;
                break;
            case 'country':
                updatableObj.country = event;
                break;
            case 'feedback':
                updatableObj.feedback = event?.target?.value;
                break;
            default:
                break;
        }

        this?.setState(updatableObj);
    };

    onSubmitData () {
        const { state, initialState, setState } = this;
        console.log('#### postingData state is being updated here');
        setState({ postingData: true });
        postData(state)?.then((e) => {
            if (e?.status === 200) {
                alert(e?.message);
                console.log('#### whole state is being reseted here');
                setState(initialState);
            }
        })
    }

    onResetData = () => {
        const { initialState, setState } = this;
        console.log('#### whole state is being reseted here');
        setState(initialState);
    };

    onChange = this.onChange.bind(this);
    onSubmitData = this.onSubmitData.bind(this);

    render () {
        counts.render ++;
        console.log('#### render FC', counts?.render);
        const { state, onChange, onResetData, onSubmitData } = this;
        const { name, mobile, address, gender, continent, country, feedback, continents, countries, fetchingContinents, fetchingCountries, postingData } = state;
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
        )
    }
}

export default FormC;