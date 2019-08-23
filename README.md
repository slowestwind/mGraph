# mGraph JavaScript (Graph Generating lib) Approach

## INTRODUCTION


`mGraph` is a simple javascript code that can convert custom flavor markdown syntax 
to SVG Graph. User can easily use this javascript to generate good looking SVG Graph and Can 
Insert it, Easily. Basically, We created this project as extension for [Advance Markdown](https://github.com/surajsinghbisht054/advance-markdown) but it is open to use for other work also.


### Advantage of Using this Script
This script generate Graph at run time and Processing happens at Client Side. Hence, Server only serve markdown syntax.

#### Understand Approach By Simple ASCII Diagram
```

	|-------------------|
	|       WEB         |
	|      SERVER       |
	|                   |
	|-------------------|
	        | |
	[SERVER HTTP RESPONSE]
			| |
			| |
			| |
			| |
			| |
	|----------------------|
	|   CLINET BROWSER     |
	|......................|
	|      STEP ONE        |  < ==== [ Retreiving mGraph JavaScript]      
	|......................|
	|      STEP TWO        |  < ==== [ Find Markdown ]
	|......................|
	|      STEP THREE      |  < ==== [ Generate SVG Graph Data ]
	|......................|
	|      STEP Four       |  < ==== [ Insert Graph in Place of Markdown ]
	|----------------------|

```


### Accepted Input Structures
We are still working over input structure approach and below, appraoch is proposed by @SurajSinghBisht054 And Upgraded By My Friend @himanshU_sharma
Our BlareGroup is still developing this approach

#### Approach to decleare Graph Structure 

```
GRAPH_NAME;
------

GRAPH_DATA;
------

GRAPH_PROPERTY;
```


### GRAPH_NAME Supported
|No|GRAPH_NAME |
|1|LINECHART   |
|2|BARCHART    |
|3|GANTTCHART  |
|4|FLOWCHART   |
|5|PIECHART    |
|6|CUSTOMCHART |


#### Example One
```
chartName;

xAxix_name, yAxix_name
xVal_1, yVal_1 
xVal_1, yVal_1 
xVal_1, yVal_1 
xVal_1, yVal_1 

```

#### LINECHART
To create linechart diagram use the following syntax.

```
LINECHART
------------------

POINT_LABEL_NAME | POINT_CONNECTIVITY | POINT_PROPERTIES
A | B, C | PLACE=(row, column)
B | E    | PLACE=(row, column)
C | D    | PLACE=(x_coordinate, y_coordinate)
D | E    | PLACE=(x_coordinate, y_coordinate)



OUTPUT will be something like this


A ------ B ------------- E
    |                    |
    |--- C ------ D ------


```
#### PIECHART
Syntax:
```
	PIECHART
		------------------

		LABEL_NAME | PERSENTAGE | POINT_PROPERTIES
		A | 50    | COLOR=RED
		B | 30    | COLOR=BLUE
		C | 10    | COLOR=GREEN
		D | 10    | COLOR=BROWN

```
#### FLOWCHART
Syntax:
```
LINECHART
------------------

POINT_LABEL_NAME | POINT_CONNECTIVITY | POINT_PROPERTIES
A | B, C | PLACE=(row, column)
B | E    | PLACE=(row, column)
C | D    | PLACE=(x_coordinate, y_coordinate)
D | E    | PLACE=(x_coordinate, y_coordinate)

```


Guys, we are still developing this approach to make it more easy to use and also advance feature supported.
we are going to start this project in next few days.

If You have suggest, contact us
	- surajsinghbisht054@gmail.com 