
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



// data extration function

function dataextraction(body){
	
    var row = body.split('\n'); //splitting data in rows from bulk
    var singlerowdata =[];		//array used to keep row data in different rows
 	var rownumber=0;			//this used to increment row number
    
  	//this loop will extract data from rows and strore in singlerowdata 2d array
  	for(var i=0;i<row.length;i++)
    {
    	//this checks if the row is empty or not if empty then skips otherwise follow steps
    	if(row[i]!=""){

    		var tmp = row[i].split('\|');	
    		tmp.shift();	//shift() used to remove 1st element of array that is unnessary(blank space) element
    														
    		//this loop will feed data in array 
    		for(var j=0;j<tmp.length;j++)
	    	{
	    			
	    			if(j==0){

						singlerowdata[rownumber]=new Array(tmp.length);
						singlerowdata[rownumber][j]=(tmp[j]);

					}
	    			else if(j<tmp.length-1)
	    			singlerowdata[rownumber][j]=(tmp[j]);
	    			else 
	    			singlerowdata[rownumber][j]=tmp[j];
	    	}
			
			rownumber++;
    	}     	
	}	


    	//check data for console
    	for(var i=0;i<singlerowdata.length;i++)
    	{	
    		for(var j=0;j<singlerowdata[i].length;j++)
    			pprint(i+","+j+"="+singlerowdata[i][j]);
    	
    	}
    	

	// pprint(singlerowdata);
	return singlerowdata;


}



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
function dotchart(data) {
	svg = svgobj(data);
	head = data[1];
	body = data[3];
	tail = data[6];
	pprint(" Dot Chart Generator Call");




	
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
	var dataArray = dataextraction(body);
	for(var i = 0; i<dataArray.length; i++){
		pprint(dataArray[i]);
	}

	var total=0; //takes total of all number in one column
	var sign=''; //for positive or negative sign 
				
	// x-axix and y-axix values
	// var x1 = 90;	// y-axix cordinates
	// var x2 = 90		// y-axix cordinates 
	// var y1 = 5		// y-axix cordinates
	// var y2 = 371	// y-axix cordinates
	// var size_of_x = dataArray.length; // number of element of x axix
	// console.log(size_of_x);
	


	// var x1 = 90;	// x-axix cordinates
	// var x2 = 705	// x-axix cordinates 
	// var y1 = 370	// x-axix cordinates			
	// var y2 = 370	// x-axix cordinates
	var array_container = []; // temp array to extract max element
	// maximum size of y cordinates axix
	for(var i = 1; i<dataArray.length; i++){
		var tmp = dataArray[i][1];
		console.log(tmp);	
		array_container.push(tmp);
	}
	var max_of_y = Math.max(...array_container);
	console.log(max_of_y);
	
	delete(array_container); // delete the created recent array

	// rounded to next 10th digits
	var round_of_max_of_y = Math.ceil((max_of_y+1)/10)*10;
	var temp = round_of_max_of_y/10;
	// console.log("rounded"+round_of_max_of_y);
	

		// console.log("size of y"+max_of_y);
		


		//********* 
		//* global variable declaration
		//*********
		// x and y axix lenth
		var y_length = 366;  //366
		var x_length = 800;  // 615
		// x and y-axix variable constant distance
		var x_line_division = x_length/size_of_x;
		console.log(x_line_division);
		
		var y_line_division = y_length/10;
		console.log(y_line_division);	
		// initial distance from x and y cordinates
		var x_ini = 100; // x-axix initialization pixel
		var y_ini = 15;  // y-axix initialization pixel
		
		// axix data will be position through this
		var x_axix_data_position = 0;
		var y_axix_data_position = 0;

	// svg diagram variable 
	//extracting output ID
    var output_id=tail.split(':');
    output_id = output_id[1].trim();
    pprint(output_id);

	var svgDiagram = document.getElementById(output_id); 

	// diagram initialization; 
	var diagram = "<svg version=\"1.2\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" class=\"graph\" aria-labelledby=\"title\" role=\"img\">";



	
	//*= making x-axix and y-axix
	for(var i = 1; i<size_of_x; i++){
		// adding of y axix line
		diagram = diagram+"<g class=\"grid y-grid\" id=\"xGrid\">"+"<line x1=\"90\" x2=\"90\" y1=\"5\" y2=\"400\"></line>"+"</g>";

		// adding of x axix line
		diagram = diagram+"<g class=\"grid y-grid\" id=\"yGrid\"><line x1=\"90\" x2=\"705\" y1=\"399\" y2=\"399\"></line></g>";
		
		// y_line_division = y_line_division+y_ini;
		x_axix_data_position = x_axix_data_position+x_line_division;
		console.log(x_axix_data_position);
		
		// adding x-axix data 
		diagram = diagram+"<g class=\"labels x-labels\"><text x=\""+x_axix_data_position+"\" y=\"420\">"+dataArray[i][0]+"</text></g>";
		

		//*= bar making procedure
		// y value setting
		// h+y = 400(line-height)
		var y = 0;
		y = 399 - dataArray[i][1];
		diagram = diagram+"<g class=\"data\" data-setname=\"Our first data set\"><rect x=\""+(x_axix_data_position-10)+"\" y=\""+y+"\" width=\"20\" height=\""+dataArray[i][1]+"\" ></rect>";
	}


		// adding y-axix data 
		for(var j = 1; j<=11; j++){			
			// x line data putting position.
			y_axix_data_position = y_axix_data_position+y_line_division;
			console.log(y_axix_data_position);
			diagram = diagram+"<g class=\"labels y-labels\"><text x=\"80\" y=\""+y_axix_data_position+"\">"+round_of_max_of_y+"</text>";
			round_of_max_of_y = round_of_max_of_y-temp;
			console.log("value of y"+round_of_max_of_y);
			

		}

	diagram=diagram+"</svg>";  //closing svg object
        //pprint(diagram);
        svgDiagram.innerHTML = diagram;	//sending data to html

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
	//https://www.vicompany.nl/magazine/how-to-code-sum-pie-a-designers-adventure-in-maths-and-svg
	//equation for finding midpoint of arc:- px=r*((x+x1)/((x+x1)^2+(y+y1)^2)));
	
	svg = svgobj(data);
	
	
    head = data[1];
    body = data[3];
    tail = data[6];
    
    //extracting output ID
    var output_id=tail.split(':');
    output_id = output_id[1].trim();
    pprint(output_id);

	var svgDiagram = document.getElementById(output_id); 

    var row = body.split('\n'); //splitting data in rows from bulk
    var singlerowdata =[];		//array used to keep row data in different rows
 	var rownumber=0;			//this used to increment row number
    
  	//this loop will extract data from rows and strore in singlerowdata 2d array
  	for(var i=0;i<row.length;i++)
    {
    	//this checks if the row is empty or not if empty then skips otherwise follow steps
    	if(row[i]!=""){

    		var tmp = row[i].split('\|');	
    		tmp.shift();	//shift() used to remove 1st element of array that is unnessary(blank space) element
    														
    		//this loop will feed data in array 
    		for(var j=0;j<tmp.length;j++)
	    	{
	    			
	    			if(j==0)
	    			singlerowdata[rownumber]=new Array(tmp.length);
	    			else if(j<tmp.length-1)
	    			singlerowdata[rownumber][j]=parseFloat(tmp[j]);
	    			else 
	    			singlerowdata[rownumber][j]=tmp[j];
	    	}
			
			rownumber++;
    	}     	
    	

	}
    	
    	
    	/*//check data for console
    	for(var i=0;i<singlerowdata.length;i++)
    	{	
    		for(var j=0;j<singlerowdata[i].length;j++)
    			pprint(i+","+j+"="+singlerowdata[i][j]);
    	
    	}
    	*/

    	
		//pie chart calculation begins:
        var xpieposition=150;	//use to increment position of pie charts on x axis
        var ypieposition=150;	//use to increment position of pie charts on y axis

        //diagram contains the svg innerhtml
		var diagram="<svg  style=\"height:300px;width:1900px;\" >";        
		
		//this loop will run to genrate no. of piechart 		
        for(var j=1;j<singlerowdata[0].length-1;j++){
	        

	        var total=0; //takes total of all number in one column
	    	var sign=''; //for positive or negative sign 
	    	
	    	//arc Coordinates
	    	var r=100;	//radius of circle
	    	var x1=r;			
			var y1=0;
	    	var y2=0;	
			var x2=0;
			var sum=0;		// taking commutative sum
			var minor=0;	// for choosing minor arc or major arc for pie
			var px=0;		//x-coordinate of text in pie
			var py=0;		//y-coodinates of text in pie

			
			for(var k=0;k<singlerowdata.length;k++)
		    {	
		      	total=total+singlerowdata[k][j];
		    }
			
			diagram= diagram+"<g transform=\"translate("+xpieposition+","+ypieposition+")\">\n";
	    	
	    	//this loop will create the arc for different portions 
	    	for(var i=0;i<singlerowdata.length;i++)
	    	{	
	    		var color=getRandomColor(); //getting random colours for pie
	    		
	    		sum=sum+singlerowdata[i][j];	//commutative sum 
				
				//finding coordinates 
				x2=Math.cos(2*3.14*(sum)/total)*r;
				y2=Math.sin(2*3.14*(sum)/total)*r;
				
				//checking for minor arc or major arc
				if((singlerowdata[i][j]/total)*100>50)
				{	
					minor=1;
					sign='-';
				}
				else
				{	
					minor=0;
					sign='';

				}

				// Adding Arc to svg
				diagram =diagram+"\n"+ "<path d=\"M00,00 L"+(x1)+","+(y1)+" A"+r+","+r+" 0 "+minor+" 1,"+x2+" "+ y2+" Z\" stroke=\"black\" stroke-width=\"1\" style=\"fill:"+color+"\" />";
				
				//adding text in pie of svg 
				px=r*((x2+x1)/Math.sqrt(Math.pow(x2+x1,2)+Math.pow(y2+y1,2)));
				py=r*((y2+y1)/Math.sqrt(Math.pow(x2+x1,2)+Math.pow(y2+y1,2)));

				diagram = diagram +"\n"+"<text x=\""+sign+parseInt(px-px/4)+"\" y=\""+sign+parseInt(py-py/4)+"\" style=\"text-anchor:middle;font-size:15px;\" fill=\"white\">"+parseInt((singlerowdata[i][j]/total)*100)+"%</text>";


				x1=x2;	
				y1=y2;
				
				//pprint(color);
	    	
	    	}
	    	diagram=diagram + "\n</g>";
	    	xpieposition = xpieposition+250;   //incrementing x coordinates create more pie charts
    	}
	    
	    
	    diagram=diagram+"</svg>";  //closing svg object
        //pprint(diagram);
        svgDiagram.innerHTML = diagram;	//sending data to html

	pprint("Pie Chart Generator Call");

}
//Random Color function
function getRandomColor() {
			  var letters = '23456789';
			  var color = '#';
			  for (var i = 0; i < 6; i++) {
			    color += letters[Math.floor(Math.random() * 8)];
			}
return color;
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
