//								[ license ]
//
//                                 Apache License
//                           Version 2.0, January 2004
//                        http://www.apache.org/licenses/
//
// Please Read LICENCE file.
//     Author:
//			Suraj Singh Bisht 
//			surajsinghbisht054@gmail.com
//			blaregroup.com
//			github.com/surajsinghbisht054
//
// --------------------------------------------------------------
//                 Configuration - Start
// ---------------------------------------------------------------

// variable to control function information output
debug = true; 

// variable to store objects
mgraph_diagrams_object_global_list=null;

// to processes line chart
function mgraph_linechart_processor(graph_body, graph_footer){
	console.log("MGRAPH LINE CHART PROCESSOR");

}

// to processes bar chart
function mgraph_barchart_processor(graph_body, graph_footer){
	console.log("MGRAPH BAR CHART PROCESSOR");
}

// to processes gantt chart
function mgraph_ganttchart_processor(graph_body, graph_footer){
	console.log("MGRAPH GANTT CHART PROCESSOR");
}

// to processes flow chart
function mgraph_flowchart_processor(graph_body, graph_footer){
	console.log("MGRAPH FLOW CHART PROCESSOR");
}

// to processes pie chart
function mgraph_piechart_processor(graph_body, graph_footer){
	console.log("MGRAPH PIE CHART PROCESSOR");
}

// to processes custom chart
function mgraph_customchart_processor(graph_body, graph_footer){
	console.log("MGRAPH CUSTOM CHART PROCESSOR");
}

// function to detect diagram type and call specific diagram processor function to process further
function mgraph_chart_generator_handler(_header, _body, _footer){
	
	_header = _header.toLowerCase().replace("\n", "");

	if (_header=="linechart") {
		mgraph_linechart_processor();

	}else if (_header=="barchart") {
		mgraph_barchart_processor();

	}else if (_header=="ganttchart") {
		mgraph_ganttchart_processor();

	}else if (_header=="flowchart") {
		mgraph_flowchart_processor();

	}else if (_header=="piechart") {
		mgraph_flowchart_processor();

	}else if (_header=="customchart") {
		mgraph_customchart_processor();

	}else{
		console.error("Diagram Type Not Detected");
		console.log("|",_header,"|");
	}
}


// get diagram object
function mgraph_diagrams_objects(){
	if (mgraph_diagrams_object_global_list) {
		if (debug) {
			console.log("mgraph_load object global list");
		}
		return mgraph_diagrams_object_global_list;

	}else{

		if (debug) {
			console.log("mgraph extracting object global list");
		}
		//
		mgraph_diagrams_object_global_list =document.getElementsByClassName("mgraph-diagram");
		return mgraph_diagrams_object_global_list;		
	}

}


// function to start processing of diagram generation
function mgraph_process_diagram_type(){
	var objects = mgraph_diagrams_objects();
	var diagram_markdown_object=null;

	// diagram syntax seperated
	var diagram_header=null;
	var diagram_body=null;
	var diagram_footer=null;

	for (var i = objects.length - 1; i >= 0; i--) {
		diagram_markdown_object = objects[i].textContent.split(/-{5,}/i);
		if (debug) {
			console.log(diagram_markdown_object);			
		}

		//
		if (diagram_markdown_object.length==3) {
			diagram_header = diagram_markdown_object[0];
			diagram_body = diagram_markdown_object[1];
			diagram_footer = diagram_markdown_object[2];
			mgraph_chart_generator_handler(diagram_header, diagram_body, diagram_footer);

		}
		else{
			console.error("Error Detected In Diagram Syntaxs Formatting");
			console.log(diagram_markdown_object);
		}
	}


}

// function to hide html container that contain diagram markdown syntaxs
function mgraph_hide_diagram_markdown(){
	var diagrams = mgraph_diagrams_objects();

	// hidden diagram  containers
	for (var i = diagrams.length - 1; i >= 0; i--) {
		diagrams[i].hidden=true;
		console.log(diagrams[i]);
	}


}

// main function
function mgraph_main() {
	// hide diagram containers
	mgraph_hide_diagram_markdown();
	mgraph_process_diagram_type();
}

// mgraph activate
function mgraph_activate() {
	console.log("mgraph module activated..");
	mgraph_main();
}



// main trigger function
mgraph_activate();