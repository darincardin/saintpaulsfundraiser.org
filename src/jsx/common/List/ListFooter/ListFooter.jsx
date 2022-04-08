import React from 'react';
import TableLink from '../TableLink/TableLink.jsx';

import './list.footer.scss';			
			
			
var ListFooter = props =>{
	
	function showNext(){			
		return props.listState.page <  (Math.ceil(props.listState.total / props.listState.getPageSize()) -1);
	}
	
	
	function showPrev(){
		return props.listState.page > 0;
	}
	
	var totalPages = [];

	var maxPage = Math.ceil(props.listState.total / props.listState.getPageSize());
	
	for(var i = 0; i < maxPage;i++) totalPages.push(i);;


	return (
		<div className="foot text-center">
			<TableLink onClick={()=>props.update(props.listState.page-1)} active={showPrev() } >&lt; Prev</TableLink>
				&nbsp;
				{totalPages.map( (obj,i) =>  
					<span key={i}>					
						{ props.listState.page==i ? <b>{i+1}</b> : <a onClick={()=>props.update(i)}>{i+1}</a> }			
					</span>	
				)}
				&nbsp;
			<TableLink onClick={()=>props.update(props.listState.page+1)} active={showNext()} >Next &gt;</TableLink>
		</div>
	)
}
export default ListFooter;
