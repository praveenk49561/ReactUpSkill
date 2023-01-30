import { Switch } from "antd";

const counts = {
    fuctionCall: 0
}; 

const Nav = (props) => {
    counts.fuctionCall ++;
    console.log('#### Whole function is being called Nav', counts.fuctionCall);
    console.log('#### Props Nav', props);


    const { header, toggleValue, isToggled, onSwitchToggle } = props;

    return (
        <div className="nav-backdrop">
            <div className="nav">
                <div className="nav-header">{header}</div>
                {toggleValue?.length === 2 && <div className="nav-toggle">
                    <Switch 
                        checkedChildren={toggleValue[0]} 
                        unCheckedChildren={toggleValue[1]}
                        onChange={onSwitchToggle}
                        checked={isToggled}
                    />
                </div>}
            </div>
        </div>
    );
};

export default Nav;