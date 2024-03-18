
const List = ({items, removeItems, editItems}) =>{

    return(
        <div className="grocery-list">
            {
                items.map( (item) =>{
                    const {id, title} = item;
                    return(
                        <div className="grocery-item" key={id}>
                            <p className="title"> {title}</p>

                        <div className="btn-container">
                            <button className="edit-btn" type="button" onClick={()=>editItems(id)}> Edit</button>
                            <button className="delete-btn" type="button" onClick={() => removeItems(id)}> Remove</button>
                        </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default List;