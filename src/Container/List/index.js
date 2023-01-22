
import { Component } from "react";
import Card from "../../Components/Card";


class List extends Component {
    render () {
        console.log('Render Func In List Comp');
        const { searchQuery, userList } = this?.props;

        const filteredList = userList?.filter((e) => e?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
        const cardList = filteredList?.map((e) => <Card name={e?.name} />);
        return <div>
            {cardList}
        </div>
    }
}

export default List;