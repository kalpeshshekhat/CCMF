
	var ec2 = new AWS.EC2();
	AWS.config.update({
		region: "us-east-1",
		accessKeyId: "AKIAJCY75NFRZN5WU6TQ",
		secretAccessKey: "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"
	});

	function getDates() {
		var listDate = [];
		//demo1.innerHTML = '';
		var startDate = document.getElementById("fromdate").value;
		var endDate = document.getElementById("todate").value;
		//alert(startDate);
		//alert(endDate);
		var dateMove = new Date(startDate);
		var strDate = startDate;
		while (strDate < endDate){
  			var strDate = dateMove.toISOString().slice(0,10);
				listDate.push(strDate);
  			dateMove.setDate(dateMove.getDate()+1);
		};
		return listDate;
	}

	function getInstances(dates) {
		var j = dates.length;
		var instArray = [];
		var count = 0;
		for (var i = 0; i < j; ++i) {
			var hourArray = [];
			var d = dates[i];
			for (var m = 0; m <= 2; m++) {
				hourArray.push(d + 'T' + m + '*');
			}
			alert(hourArray);
			var ec2 = new AWS.EC2();
			AWS.config.update({
				region: "us-east-1",
				accessKeyId: "AKIAJCY75NFRZN5WU6TQ",
				secretAccessKey: "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"
			});

			var describeInstances = function describeInstances() {
			var params = {
				Filters: [
					{
					Name: 'launch-time',
					Values: hourArray
					}]
				};
				alert(JSON.stringify(params.Filters));
				return ec2.describeInstances(params).promise();
			};

			function sleep(ms) {
  			return new Promise(resolve => setTimeout(resolve, ms));
			}
			async function sleepfunction() {
  			//console.log('Taking a break...');
  			await sleep(4000);
  			//console.log('Two second later');
			}
			sleepfunction();
			describeInstances().then(function(data){

					var no_of_inst = data.Reservations.length;
					instArray.push(no_of_inst);
					alert(dates+' '+instArray);
					++count;
					if ( count == j-1 ) {
						var trace2 = {
		  				x: dates,
		  				y: instArray,
							name: 'instances',
		  				type: 'line',
								marker: {color: '#19d3f3'}
						};
						var layout = {
  						title: 'EC2 Instance Migration',
  						xaxis: {
    						title: 'Dates',
    						showgrid: true,
    						zeroline: false
  				 		},
  						yaxis: {
    						title: 'No. of Instances',
    						showline: true
  						}
						};
						var ec2data = [trace2];
						Plotly.newPlot('myDiv', ec2data, layout);
					}
				});

			//.catch(function(err) {
			//	console.log(err);
			//});
	  }

  }

	function getDatesInstances() {
		var dates = getDates();
		alert(dates);
		getInstances(dates);
	}
