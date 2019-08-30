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

// textarea id
var InputID = "MDEditor";

// preview div id
var OutputID = "MDViewerPreview"; 

// ---------------------------------------------------------------
//                 Regex Expression
// ---------------------------------------------------------------
var EXP_FLOWCHART = '(\n(flowchart)\n(```)([^]+?)(```)(.+))' 			// Flowchart 
var EXP_JOINER  = '|'
var EXP_INLINES = '(.+)'



// All Expression
EXP_ALL = ''
EXP_ALL = EXP_ALL + EXP_FLOWCHART + EXP_JOINER
// EXP_ALL = EXP_ALL + EXP_BLOCKQ  + EXP_JOINER
EXP_ALL = EXP_ALL + EXP_INLINES


// REGEX
var REGEX_FLOWCHART = new RegExp(EXP_FLOWCHART);
var REGEX_INLINES = new RegExp(EXP_INLINES);
var REGEX_INLINES = new RegExp(EXP_INLINES);
var REGEX_EXP_ALL = new RegExp(EXP_ALL);



DEFAULT_STYLE = [
    //	('Styles', 'Class') <-- Index Number is Key [Use Class for Bootstrap Features]
        ["border-left-style: groove;border-left-color: darkgreen;border-left-width: thick;", 'blockquote pl-1'], // 0== Blockquote
        ["", 'm-5 text-danger '],	//1== Tab indents
        ['','ml-1'], // 2==> Global 
        
    
    ]
    

// Add Style
function AddStyle(exp, n, additional) {
	// Format
	var obj = '';
	if(DEFAULT_STYLE[n][0]){
	obj += ' style="'+DEFAULT_STYLE[n][0];
	obj += additional;
	obj += '"';	
	};

	if(DEFAULT_STYLE[n][1]){
	obj += ' class="';
	obj += DEFAULT_STYLE[n][1];
	obj += '"';	
	
	}

	
	exp = exp.replace('{style}',obj);
	return exp;
}



// Escape HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

// Replace All Function
String.prototype.replaceall = function (find, replace) {
    var str = this;
    	return str.replace(new RegExp(find, 'g'), replace)
}

// Custom Slicing Technique
String.prototype.indexslice = function (x, y='+'){
	var txt = this;
	tmp = '';
	// if minus
	if (x<0){
		x = txt.length + x;
	}
	if (y<0){
		y = txt.length + y-1;
	}
	if (y=='+') {
		y = txt.length;
	}
	//console.log('X : '+x+', Y : '+y);
	if (x<y) {
		for (var i = x; i < y; i++) {
			tmp = tmp + txt[i];
		}
	}else{
		for (var i = x ; i >= y; i--) {
			tmp = txt[i] +tmp ;
		}
	}
	return tmp;
}




// FLOW CHART PROCESSOR
function FLOWCHARTPROCESSOR(argument){
	// Input:
	//		argument = Text
	//	Output:
	//		Special tags attached to argument
	//

	// Numbers 
	tmp = argument.search(' ');
	// HTML Element Tag
	etag = "<h" + (tmp -1) + '{style}>{}</h'+(tmp-1)+'>';
	//console.log(argument.search(' '));
	etag = etag.replace('{}', argument.indexslice(tmp));
	return AddStyle(etag, 4)
}


// Tab Lines Processor
function IndentProcessor(argument){
	argument = argument.replace('\n', '');
	argument = argument.replaceall('\n', '<br />');
	//console.log(argument)
	argument = '<div {style}>{0}</div>'.replace('{0}', argument);
	return AddStyle(argument, 1);
}	

// Function To Add Opening And Closing Tags In Start And End of Word
function LittleProcessor(txt, exp, element, opentag, closetag){
	// Parameters:
	//		txt = text
	//		exp = Regular Expression
	//		element = array of element to replace with opening and closing tag
	//		opentag = Opening Tag
	//		closetag = Closing Tag
	//
	tmptxt = ''
	remind = 0;
	txt = txt.split(RegExp(exp))
	//console.log(txt)
	for (var i = 0; i < txt.length; i++) {
		// If EXP Found
		if (element.indexOf(txt[i])!=-1)  {
			
			if (remind) {
				tmptxt += closetag;
				remind=0;
			}else{
				tmptxt += opentag;
				remind = 1;
			}
		}else{
			if (txt[i]) {
				tmptxt += txt[i]	
			}
		}
	}
	return tmptxt
}



function InlineRegex(argument){
	//console.log('({})'.replace('{}',argument));
	// Code
	if (REGEX_BLOCK_C.test(argument)){
		//console.log(argument)
		return CDBLOCKPROCESSOR(argument);
	} 	
	// Indent Done
	else if (REGEX_INDENTS.test(argument)){
		return IndentProcessor(argument)
	}
	// Blockquote
	else if(REGEX_BLOCK_Q.test(argument)){
		//console.log(argument);
		tmp = '<pre {style} >{0}</pre>'.replace('{0}',argument);
		tmp = AddStyle(tmp, 0, 'margin-left: '+tmp.match(/&gt;/g).length+'0px;'); 
		tmp = tmp.replace(/&gt;/g,"");
		return tmp;
	}
	// Table
	else if (REGEX_TABLEBD.test(argument)){
		return TABLEPROCESSOR(argument);
	}	
	// Heading
	else if (REGEX_HEADING.test(argument)){
		return HEADINGPROCESSOR(argument);
	}
	// Heading Horizontal Done
	else if (REGEX_HEAD_HR.test(argument)){
		return HRRULERPROCESSOR(argument);
	}
	// Horizontal Rulers Done
	else if (REGEX_HRRULER.test(argument)){
		return HRRULER_PROCESSOR(argument);
	}
	// Order List
	else if (REGEX_OL_LIST.test(argument)){
		return OrderListProcessor(argument);
	}
	// Unordered List
	else if (REGEX_UL_LIST.test(argument)){
		return UnOrderListProcessor(argument);
	}
	
	// Inlines
	else if (REGEX_INLINES.test(argument)){
		return GLOBALPROCESSOR(argument);
	}
	// Not Identified
	else{
		return '<div id="notidentified">{}</div>'.replace('{}', argument);
	}
}

// Process Parent Regex 
function ParentRegex(text){
	// Find Match
	EXPRESSION = EXP_ALL;

	EXPRESSION = new RegExp(EXPRESSION, 'g');
	//console.log("Compiled EXPRESSION : "+ EXPRESSION);
	var result = text.match(EXPRESSION);
	//console.log("Search Result : "+ result);
	return result;
}

// Markdown To Html Conversion main function
function MDTOHTML(inp, out){
	// nodes
	var node = ''

	// Some Required Editings
	var input_text = '\n' + inp.value;
	input_text = input_text.replaceall('\t', '    ');
	
	input_text = escapeHtml(input_text);

	// if text, then call 
	if (input_text) {

		// Call Parent Tag Processor Function
		var parentnodes = ParentRegex(input_text);
		if (parentnodes) {

			for (var i = 0; i < parentnodes.length; i++) {
				node = node + InternalProcessors(InlineRegex(parentnodes[i]));
			};
		}
	};
	
	return node;

}

// preview Function Automatically Gets Trigger When, User Press Any keyboard button
function preview() {

	// Get Objects
	var inptext = document.getElementById('MDEditor');
	var outtext = document.getElementById('MDViewerPreview');

	// If User Inserted Object Detected
	if ((inptext) && (outtext)) {
		// Call Markdown To html Conversion function
		var nodes = MDTOHTML(inptext, outtext);
	
		// if nodes
		if (nodes) {
			outtext.innerHTML = nodes;
		};
	};


	return;
}

// function to automatically, bind preview function with keyboard key
function bindkey(){

		// Event handling Mechanism
		var inptext = document.getElementById(InputID);


		//	Check if its non IE
		if (inptext.addEventListener) {
		  	inptext.addEventListener('input', preview);
		}else{
			if (inptext.attachEvent) {
				inptext.attachEvent('onpropertychange', preview);
			}
		}; 

		// Preview Call
		preview();

}



