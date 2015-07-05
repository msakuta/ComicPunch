onload = function() {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('canvassample');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  /* 2Dコンテキスト */
  ctx = canvas.getContext('2d');
  draw();

};

function draw() {
  /* 四角を描く */
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(192, 192, 77)'; // yellow
		ctx.font = "14px 'ＭＳ Ｐゴシック'";
  ctx.strokeText('Canvas v1.00', 420, 10);
  ctx.rect(x0, y0, w0, h0);
  ctx.rect(x1, y1, w1, h1);
  // test
  ctx.moveTo(140, 70);
  ctx.lineTo(180, 70);
  ctx.lineTo(180, 170);
  ctx.lineTo(140, 170);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = 'rgba(192, 80, 77, 0.5)'; // 赤
  ctx.fillRect(220, 140, 100, 100);

  // menu
  drawMenu(0);
  drawTBox(cur_tool);
  drawCBox(cur_col);
  drawHBox(cur_thin);
};

// draw cood(for Debug)
function drawPos(x, y) {
  /* 座標を描く */
  ctx.strokeText('X='+x+' Y='+y, x, y);
}

// Menu
function drawMenu(no) {
	for(i=0;i<7;i++) {
		if (no == i+1)
			ctx.fillStyle = 'rgb(120, 255, 120)'; // green
		else
			ctx.fillStyle = 'rgb(100, 200, 100)'; // green
		ctx.fillRect(mx1+i*(mw1+10), my0, mw1, mh0);
		//ctx.strokeStyle = 'rgb(50, 192, 177)'; // cyan
		ctx.strokeStyle = 'rgb(250, 250, 250)'; // white
		ctx.strokeText(menustr[i], mx1+10+i*(mw1+10), my0+20);
	}
}

// Tool Box
function drawTBox(no) {
	for(i=0;i<15;i++) {
		if (no == i+11)
			ctx.fillStyle = 'rgb(255, 80, 77)'; // 赤
		else
			ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
		ctx.fillRect(mx0, my0+40*i, mw0, mh0);
		ctx.strokeStyle = 'rgb(250, 250, 250)'; // white
		drawParts(i+11, mx0+10, my0+10+(mh0+10)*i);
	}
}

// Color Parett
function drawCBox(no) {
	for(i=0;i<5;i++) {
		ctx.beginPath();
		ctx.fillStyle = colstr[i];
		x = mx2+(mw2+10)*i;
		ctx.fillRect(x, my0, mw2, mh0);
		ctx.stroke();
		if (4==i) {		// whiteのとき枠線
			ctx.beginPath();
			//ctx.lineWidth = 1;
			ctx.strokeStyle = gray;
			ctx.rect(x, my0, mw2, mh0);
			ctx.stroke();
		}
		if (no == i+31) {
			ctx.beginPath();
			ctx.strokeStyle = gray;
			ctx.strokeText('○', x+9, my0+20);
		}
	}
}

// Thin Box
function drawHBox(no) {
	for(i=0;i<3;i++) {
		ctx.beginPath();
		if (no == i+41)
			ctx.fillStyle = 'rgb(255, 80, 77)'; // 赤
		else
			ctx.fillStyle = 'rgb(192, 80, 77)'; // 赤
		ctx.fillRect(mx3+(mw2+10)*i, my0, mw2, mh0);
		ctx.beginPath();
		ctx.strokeStyle = white;
		ctx.lineWidth = i + 1;
		ctx.moveTo(mx3+(mw2+10)*i+10, my0+15);
		ctx.lineTo(mx3+(mw2+10)*i+25, my0+15);
		ctx.stroke();
	}
	ctx.lineWidth = 1;
}

// draw toolbox
function drawParts(no, x, y) {
	var a = new Array(3);
	switch (no) {
	case 11:		// line
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x+40, y+10);
		ctx.stroke();
		ctx.strokeText('2', x+45, y+10);
		break;
	case 12:		// arrow
		ctx.beginPath();
		a[0] = {x:x, y:y+5};
		a[1] = {x:x+40, y:y+5};
		l_arrow(ctx, a);
		ctx.strokeText('2', x+45, y+10);
		break;
	case 13:		// twin arrow
		ctx.beginPath();
		a[0] = {x:x, y:y+5};
		a[1] = {x:x+40, y:y+5};
		l_tarrow(ctx, a);
		ctx.strokeText('2', x+45, y+10);
		break;
	case 14:		// double arrow
		ctx.beginPath();
		ctx.moveTo(x, y+3);
		ctx.lineTo(x+39, y+3);
		ctx.moveTo(x, y+7);
		ctx.lineTo(x+39, y+7);
		ctx.moveTo(x+35, y);
		ctx.lineTo(x+40, y+5);
		ctx.lineTo(x+35, y+10);
		ctx.stroke();
		ctx.strokeText('2', x+45, y+10);
		break;
	case 15:		// arc
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+20, y+20, x+40, y);
		ctx.stroke();
		ctx.strokeText('3', x+45, y+10);
		break;
	case 16:		// arc arrow
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+20, y+20, x+40, y);
		a[0] = {x:x+20, y:y+20};
		a[1] = {x:x+40, y:y};
		l_hige(ctx, a);
		ctx.strokeText('3', x+45, y+10);
		break;
	case 17:		// twin arc arrow
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.quadraticCurveTo(x+20, y+20, x+40, y);
		a[0] = {x:x+20, y:y+20};
		a[1] = {x:x+40, y:y};
		l_hige(ctx, a);
		//a[0] = {x:x+10, y:y+10};
		a[1] = {x:x, y:y};
		l_hige(ctx, a);
		ctx.strokeText('3', x+45, y+10);
		break;
	case 18:		// rect
		ctx.beginPath();
		ctx.rect(x, y, 40, 10);
		ctx.stroke();
		ctx.strokeText('2', x+45, y+10);
		break;
	case 19:		// elipse
		ctx.beginPath();
		ctx.scale(1.0, 0.5);		// 縦半分
		ctx.arc(x+20, (y+5)*2, 20, 0, 2 * Math.PI, false);
		ctx.stroke();
		ctx.scale(1.0, 2.0);
		ctx.strokeText('2', x+45, y+10);
		break;
	case 20:		// rect fill
		ctx.beginPath();
		ctx.fillStyle = 'rgb(250, 250, 250)';
		ctx.fillRect(x, y, 40, 10);
		ctx.strokeText('2', x+45, y+10);
		break;
	case 21:		// elipse fill
		ctx.beginPath();
		ctx.fillStyle = 'rgb(250, 250, 250)';
		ctx.scale(1.0, 0.5);		// 縦半分
		ctx.arc(x+20, (y+5)*2, 20, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.scale(1.0, 2.0);
		ctx.strokeText('2', x+45, y+10);
		break;
	case 22:		//star
		ctx.beginPath();
		ctx.moveTo(x+8, y-3);
		ctx.lineTo(x+14, y+13);
		ctx.lineTo(x, y+2);
		ctx.lineTo(x+16, y+2);
		ctx.lineTo(x+2, y+13);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeText('1', x+45, y+10);
		break;
	case 23:		// check
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x+5, y+7);
		ctx.lineTo(x+20, y);
		ctx.stroke();
		ctx.strokeText('1', x+45, y+10);
		break;
	case 24:		// 完
		ctx.beginPath();
		ctx.strokeText('済', x+3, y+10);
		ctx.beginPath();
		ctx.arc(x+9, y+5, 8, 0, 6.28, false);
		ctx.stroke();
		ctx.strokeText('1', x+45, y+10);
		break;
	case 25:		// 文字
		ctx.beginPath();
		ctx.strokeText('文字', x+3, y+10);
		ctx.strokeText('1', x+45, y+10);
		break;
	default:
		ctx.strokeText("未実装", x, y);
	}
}


function mouseLeftClick(e) {
	if (3 == e.which) mouseRightClick(e);
	else {
		var menuno = checkMenu(e.pageX, e.pageY);
		debug(menuno);
		if (menuno == 0) {		// draw area
			draw_point(e.pageX, e.pageY);
		}
		else if (menuno <= 10) {
			drawMenu(menuno);
			cur_menu = menuno;
			if (1 == cur_menu) {	// save
				if (ajaxsave()) clearCanvas();
			}
			else if (2 == cur_menu) {	// list
				//clearCanvas();
				ajaxsearch(0);
			}
			else if (3 == cur_menu) {	// search
				//clearCanvas();
				ajaxsearch(1);
			}
			else if (4 == cur_menu) {	// clear
				clearCanvas();
				ajaxclear();
			}
			else if (5 == cur_menu) {	// redraw
				clearCanvas();
				ajaxredraw(selectedID());
			}
			else if (6 == cur_menu) {	// undo
				clearCanvas();
				ajaxundo();
			}
			else if (7 == cur_menu) {	// append
				if (ajaxappend()) clearCanvas();
			}
		}
		else if (menuno <= 30) {
			drawTBox(menuno);
			cur_tool = menuno;
			idx = 0;
		}
		else if (menuno <= 40) {
			drawCBox(menuno);
			cur_col = menuno;
		}
		else {
			drawHBox(menuno);
			cur_thin = menuno;
		}
		//if (1 == menuno) debug('x='+arr[0].x + 'y='+arr[0].y);
	}
}

function mouseRightClick(e) {
	//drawPos(e.pageX, e.pageY);
	//cood = { x:e.pageX, y:e.pageY }
	//arr[idx] = cood;
	//idx++;
	debug('idx='+idx);
}

// draw one click
function draw_point(x, y) {
	debug('idx='+idx+',x='+x+',y='+y);
	cood = { x:x, y:y }
	arr[idx] = cood;
	idx++;
	if (idx == points()) drawCanvas(0, null);
}

// return tool points
function points() {
	if (cur_tool >=22 && cur_tool <=25) return 1;
	else if (cur_tool >=15 && cur_tool <=17) return 3;
	else return 2;
}

// draw parts
function drawCanvas(mode, str) {
	// DEBUG
	//if (1 == mode) alert("tool="+cur_tool+",col="+cur_col+",thin ="+cur_thin);
	switch (cur_tool) {
	case 11:	// line
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		ctx.moveTo(arr[0].x, arr[0].y);
		ctx.lineTo(arr[1].x, arr[1].y);
		ctx.stroke();
		ctx.lineWidth = 1;
		break;
	case 12:	// arrow
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		l_arrow(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 13:	// twin arrow
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		l_tarrow(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 14:	// double arrow
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		l_darrow(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 15:	// arc
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		ctx.moveTo(arr[0].x, arr[0].y);
		ctx.quadraticCurveTo(arr[1].x, arr[1].y, arr[2].x, arr[2].y);
		ctx.stroke();
		ctx.lineWidth = 1;
		break;
	case 16:	// arc arrow
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		ctx.moveTo(arr[0].x, arr[0].y);
		ctx.quadraticCurveTo(arr[1].x, arr[1].y, arr[2].x, arr[2].y);
		var a = new Array(2);
		a[0] = arr[1];
		a[1] = arr[2];
		l_hige(ctx, a);
		ctx.lineWidth = 1;
		break;
	case 17:	// arc twin arrow
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		ctx.moveTo(arr[0].x, arr[0].y);
		ctx.quadraticCurveTo(arr[1].x, arr[1].y, arr[2].x, arr[2].y);
		var a = new Array(2);
		a[0] = arr[1];
		a[1] = arr[2];
		l_hige(ctx, a);
		a[1] = arr[0];
		l_hige(ctx, a);
		ctx.lineWidth = 1;
		break;
	case 18:	// rect
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		ctx.rect(arr[0].x, arr[0].y, arr[1].x-arr[0].x, arr[1].y-arr[0].y);
		ctx.stroke();
		ctx.lineWidth = 1;
		break;
	case 19:	// elipse
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		l_elipse(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 20:	// rect fill
		ctx.beginPath();
		ctx.fillStyle = colstr[cur_col-31];
		ctx.fillRect(arr[0].x, arr[0].y, arr[1].x-arr[0].x, arr[1].y-arr[0].y);
		break;
	case 21:	// elipse fill
		ctx.beginPath();
		ctx.fillStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 40;
		l_elipsef(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 22:	// star
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		//ctx.lineWidth = cur_thin - 40;
		l_star(ctx, arr);
		ctx.lineWidth = 1;
		break;
	case 23:	// check
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		l_check(ctx, arr);
		break;
	case 24:	// complete
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		l_complete(ctx, arr);
		break;
	case 25:	// string
		if (0 == mode) str = prompt("文字列:", "");
		if (null == str) {		// cancel
			idx = 0;
			return;
		}
		ctx.beginPath();
		ctx.strokeStyle = colstr[cur_col-31];
		ctx.lineWidth = cur_thin - 41;
		
		if (41 == cur_thin) ctx.font = "14px 'ＭＳ Ｐゴシック'";
		else if (42 == cur_thin) ctx.font = "16px 'ＭＳ Ｐゴシック'";
		else ctx.font = "20px 'ＭＳ Ｐゴシック'";
		ctx.strokeText(str, arr[0].x, arr[0].y);
		ctx.font = "14px 'ＭＳ Ｐゴシック'";
		break;
	default:
		debug("illegal tool no "+cur_tool);
	}
	
	if (0 == mode) {	// regist
		// send parts to server
		var dat = ""+cur_tool+":"+cur_col+":"+cur_thin;
		for (i=0; i<3; i++) dat += ":"+arr[i].x+":"+arr[i].y;
		if (25 == cur_tool) dat += ":"+str;
		ajaxparts(dat);
	}
	// clear
	idx = 0;
	
}
// redraw
function redraw(str) {
	// backup
	var org_tool = cur_tool;
	var org_col = cur_col;
	var org_thin = cur_thin;
	var pt = str.split("|");
	//alert("pt length="+pt.length);
	for (i=0; i<pt.length; i++) {
		var pt1 = pt[i].split(":");
		if (10 != pt1.length) continue;
		cur_tool = pt1[0]-0;
		cur_col = pt1[1]-0;
		cur_thin = pt1[2]-0;
		arr[0] = {x:pt1[3]-0, y:pt1[4]-0};
		arr[1] = {x:pt1[5]-0, y:pt1[6]-0};
		arr[2] = {x:pt1[7]-0, y:pt1[8]-0};
		var rstr = null;
		if (25 == cur_tool) rstr = pt1[9];
		drawCanvas(1, rstr);
	}

	// restore tools
	cur_tool = org_tool;
	cur_col = org_col;
	cur_thin = org_thin;
}

// clear canvas
function clearCanvas() {
	ctx.fillStyle = white;
	ctx.fillRect(x1,y1, w1, h1);
	idx = 0;
	zorder = 0;
}

// selection追加
function setSelect(str) {
	var name = null;
	var option = null;
	var text = null;
	var sel = document.forms[0].canvasselect;
	// clear
	var n = sel.childNodes.length;
	for (i=n-1; i>0; i--) sel.removeChild(sel.childNodes.item(i));
	// parse
	var ca = str.split("|");
	if (ca.length < 2) return;
	// create node
	for (i=0; i<ca.length-1; i++) {
		name = ca[i].split(":");
		option = document.createElement("OPTION");
		option.setAttribute("value", name[0]);
		text = document.createTextNode(name[1]);
		option.appendChild(text);
		sel.appendChild(option);
	}
}

// selectされたIDを得る
function selectedID() {
	var name = null;
	var option = null;
	var text = null;
	var sel = document.forms[0].canvasselect;
	var idx = sel.selectedIndex;
	return sel.options[idx].value;
}

// check all menu
function checkMenu(x, y) {
	var no = choiceMenu(x, y);
	if (no > 0) return no;
	no = choiceTBox(x, y);
	if (no > 0) return no;
	no = choiceCBox(x, y);
	if (no > 0) return no;
	no = choiceHBox(x, y);
	if (no > 0) return no;

	if (x > w0 || y > h0) no = -1;
	return no;
}

function choiceMenu(x, y) {
	// menu
	if (y < my0 || y > my0+mh0) return 0;
	for(i=0;i<7;i++) {
		if (x >= mx1+(mw1+10)*i && x <= mx1+mw0+(mw1+10)*i) return i+1;
	}

	return 0;
}

//
function choiceTBox(x, y) {
	// ToolBox
	if (x < mx0 || x > mx0+mw0) return 0;
	for(i=0;i<15;i++) {
		if (y >= my0+(mh0+10)*i && y <= my0+mh0+(mh0+10)*i) return i+11;
	}
	
	return 0;
}

	// Color Parett
function choiceCBox(x, y) {
	if (y < my0 || y > my0+mh0) return 0;
	for(i=0;i<5;i++) {
		if (x >= mx2+(mw2+10)*i && x <= mx2+mw2+(mw2+10)*i) return i+31;
	}
	
	return 0;
}
	// Thin Box
function choiceHBox(x, y) {
	if (y < my0 || y > my0+mh0) return 0;
	for(i=0;i<3;i++) {
		if (x >= mx3+(mw2+10)*i && x <= mx3+mw2+(mw2+10)*i) return i+41;
	}
	
	return 0;
}

//------------------- ajax -----------------------------------
// save data
function ajaxsave() {
	xmlHttp = createXMLHttpRequest(retparts);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
			var title = prompt("TITLE:", "");
			if (null == title) return false;
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=save&title="+encodeURI(title), true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}

	return true;
}

// append save
function ajaxappend() {
	var sel = document.forms[0].canvasselect;
	var idx = sel.selectedIndex;
	if (0 == idx) {
		alert("上書きする図を選択してください");
		return false;
	}
	var title =  sel.options[idx].innerHTML;
	if (!confirm("TITLE:"+title+"に追加書き込みしますか？")) return false;

	xmlHttp = createXMLHttpRequest(retparts);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=append&title="+encodeURI(title), true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}

	return true;
}

// search
function ajaxsearch(mode) {
	xmlHttp = createXMLHttpRequest(retsearch);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
		try {
			if (1 == mode) {
				var keyword = prompt("KEYWORD:", "");
				if (null == keyword) return;
				xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=search&keyword="+encodeURI(keyword), true);
			}
			else {
				xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=list", true);
			}
			xmlHttp.send("");
		}
		catch (e) {
			alert("exception:"+e);
		}
	}
	else {
		alert("失敗:"+xmlHttp);
	}
}

// Ajax通信開始(parts)
function ajaxparts(str) {
	xmlHttp = createXMLHttpRequest(retparts);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=parts&data="+encodeURI(str), true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}

}

// clear data
function ajaxclear() {
	xmlHttp = createXMLHttpRequest(retparts);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=clear", true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}
}

// undo
function ajaxundo() {
	xmlHttp = createXMLHttpRequest(retparts);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=undo", true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}
}

// redraw
function ajaxredraw(id) {
	xmlHttp = createXMLHttpRequest(retredraw);

	if (null != xmlHttp) {
//			alert("成功:"+xmlHttp);
   		try {
   	    	xmlHttp.open("GET","/tearoom/servlet/Canvas?do=ajax&command=redraw&id="+id, true);
    	    xmlHttp.send("");
   		}
   		catch (e) {
   	    	alert("exception:"+e);
   		}
	}
	else {
    	alert("失敗:"+xmlHttp);
	}
}

// Ajax通信完了(parts,save,append,clear,undo)
function retparts() {
	if (xmlHttp.readyState == 4) {      // finish
	if (xmlHttp.status == 200) {    // success
			document.getElementById('message').innerHTML = xmlHttp.responseText;
			if ("REDRAW" == xmlHttp.responseText) ajaxredraw(0);
			else if ("ALREADY EXIST." == xmlHttp.responseText) alert("同じタイトルがあります。別のタイトルを指定してください。");
	}
		else {
			alert("status="+xmlHttp.status);
		}
	}
	else {
	}
}

// Ajax通信完了(redraw)
function retredraw() {
	if (xmlHttp.readyState == 4) {      // finish
		if (xmlHttp.status == 200) {    // success
			if (xmlHttp.responseText.substring(0,1) == "E") {
				document.getElementById('message').innerHTML = xmlHttp.responseText;
			}
			else {
				redraw(xmlHttp.responseText);
				document.getElementById('message').innerHTML = "OK";
			}
		}
		else {
			alert("status="+xmlHttp.status);
		}
	}
	else {
	}
}

// Ajax通信完了(search)
function retsearch() {
	if (xmlHttp.readyState == 4) {      // finish
		if (xmlHttp.status == 200) {    // success
			if (xmlHttp.responseText.substring(0,1) == "E") {
				document.getElementById('message').innerHTML = xmlHttp.responseText;
			}
			else {
				setSelect(xmlHttp.responseText);
			}
		}
		else {
			alert("status="+xmlHttp.status);
		}
	}
	else {
	}
}

// HTTP通信用、共通関数
function createXMLHttpRequest(cbFunc) {
    var xmlHttp = null;
    try {		// 通常のAjax(IE以外)
        xmlHttp = new XMLHttpRequest();
    }
    catch(e) {
        try {		// IE用
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e) {
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e) {
                return null;
            }
        }
    }
    // callback関数の設定
    if (xmlHttp) xmlHttp.onreadystatechange = cbFunc;
    return xmlHttp;
}

//------------------------ debug ------------------------
function debug(msg) {
  var darea = document.getElementById('message');
  darea.innerHTML = msg;
}

// init --------------------------------------------------
window.captureEvents(Event.click);
onclick=mouseLeftClick;
var arr = new Array({x:0,y:0}, {x:0,y:0}, {x:0,y:0});
var idx = 0, zorder = 0;
var ctx;
var menustr = new Array("保存","一覧","検索","クリア","再描画","undo","追加保存");
var white = "rgb(255, 255, 255)";
var black = "rgb(0, 0, 0)";
var blue = "rgb(0, 100, 255)";
var green = "rgb(0, 255, 0)";
var red = "rgb(255, 0, 0)";
var gray = "rgb(150, 150, 150)";
var colstr = new Array(black,blue,red,green,white);
var x0 = 0, y0 = 0, w0 = 1024, h0 = 640;
var x1 = 90, y1 = 50, w1 = 930, h1 = 580;
var mx0 = 10, mx1 = x1, mx2 = 600, mx3 = 820;
var mw0 = 70, mw1 = 60, mw2 = 30, my0 = 20, mh0 = 30;
var cur_tool = 11, cur_col = 31, cur_thin = 41;


