
//
//	                           [ license ]
//
//                                 Apache License
//                           Version 2.0, January 2004
//                        http://www.apache.org/licenses/
// Please read licence file.

//
//     Author:
//			Suraj Singh Bisht 
//			surajsinghbisht054@gmail.com
//			github.com/surajsinghbisht054


/*
* configurations options
*
*/
debug = true; // dubug console output messages

// to retrieve svg object
function svgobj(objid){
	pprint(document.getElementById(objid));
	return document.getElementById(objid);
}

// print console output
function pprint(msg){
	if(debug){
		console.log(msg);
	}
}

// function to handle line chart data
function linechart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint(" Line Chart Generator Call");

}

// function to handle bar chart data
function barchart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint(" Bar Chart Generator Call");


}


// function to handle gantt chart data
function ganttchart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint(" Gantt Chart Generator Call");

}


// function to handle flowchart data
function flowchart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint("Flow Chart Generator Call");

}


// function to handle pie chart data
function piechart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint("Pie Chart Generator Call");

}


// function to handle tree chart data
function treechart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint("Tree Chart Generator Call");

}


// function to handle custom chart data
function customchart(data){
	svg = svgobj(data);
        head = data[1];
        body = data[3];
        tail = data[6];
	pprint(" Custom Chart Generator Call");

}




// Chart Data filter and extraction function
function ChartGenerator(reExpression){
	//console.log(reExpression);
/*
0: all graph data
1: graph heading
3: graph body
6: graph property
*/
	head = reExpression[1]
	body = reExpression[3]
	tail = reExpression[6]

	if(head == "lchrt"){
	pprint("Line Graph Detected ");
		linechart(reExpression);

	}else if(head == "bchrt"){
        pprint("Bar Graph Detected ");
                barchart(reExpression)

	}else if(head == "gchrt"){
        pprint("Gantt Graph Detected ");
		ganttchart(reExpression)

	}else if(head == "fchrt"){
        pprint("Flow Graph Detected ");
		flowchart(reExpression)


	}else if(head == "pchrt"){
        pprint("Pie Graph Detected ");
		piechart(reExpression)


	}else if(head == "tchrt"){
        pprint("Tree Graph Detected ");
		treechart(reExpression)

	}else if(head == "cchrt"){
        pprint("Custom Graph Detected ");
		customchart(reExpression)

	}else{
        pprint("No Graph Detected ");

	}

}



// text processor
function textProcessor(text){
	// https://javascript.info/regexp-methods
	var syntaxContent = "(.+)\n(-{5,})((\n|.)+?)(-{5,})((\n|.)+?)(?=\n\n)";

	let matchall = text.matchAll(syntaxContent);

	matchall = Array.from(matchall);

	for(var i=0; i<matchall.length; i++){
		ChartGenerator(matchall[i]);
	}
}

// hide object
function hideobj(obj){
	obj.hidden = true;
}


/*

	initialise function

*/
function mgraph_draw(pre_input_id){
	// retrieve obj by id
	objc = document.getElementById(pre_input_id);
	pprint("input id : " + pre_input_id);
	hideobj(objc); // hide object
	textProcessor(objc.textContent);
}
