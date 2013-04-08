/*global $,d3,window*/

$(function() {
    'use strict';

    var svg,
        border = 50,
        width = 1200,
        height = 700,
        color = d3.scale.category20();

    var x = d3.scale.linear()
        .range([border, width-border]);

    var y = d3.scale.linear()
        .range([height-border, border]);

    var y2 = d3.scale.linear()
        .range([height-border, border]);

    var xAxis = d3.svg.axis()
            .scale( x )
            .orient( 'bottom' );

    var yAxis = d3.svg.axis()
            .scale( y )
            .orient( 'left' );

    var area = d3.svg.area()
        .x(function(d) { return x(d.x); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y2(d.y); });

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });

    // Create a workspace
    svg = d3.select( '#visualisation' )
        .append( 'svg' )
        .attr( 'width', width )
        .attr( 'height', height );

    // Loading data
    d3.tsv( 'results/memory.log', function( data ) {

        x.domain([0, data.length]);
        y.domain([
            0,
            d3.max(data, function(d) { return d.rss*1.2; }) // + d3.max(data, function(d) { return Math.round(d.vsz); })
        ]);
        y2.domain([
            0,
            d3.max(data, function(d) { return d.cpu; })
        ]);

        var names = ['rss'],
            samples = [],
            cpus;

        samples = stack(names.map(function( name ) {
            return {
                name: name,
                values: data.map(function( d, i ) {
                    return {
                        x: i,
                        y: Math.round(d[name])
                    };
                })
            };
        }));

        cpus = data.map(function( d, i ) {
            return {
                x: i,
                y: Math.round(d.cpu)
            };
        });

        var sample = svg.selectAll('.sample')
            .data( samples )
            .enter().append('g');

        sample.append('path')
            .attr('d', function(d) { return area( d.values ); })
            .style('fill', function(d) { return color( d.name ); });

        svg.append('g')
            .attr( 'class', 'axis' )
            .attr( 'transform', 'translate(0,' + (height - border) + ')' )
            .call(xAxis);

        yAxis.tickFormat(function(i) { return i / 1000 + "MB"; });

        svg.append('g')
            .attr( 'class', 'axis' )
            .attr( 'transform', 'translate(' + border + ', 0)' )
            .call(yAxis);

        // var cpu = svg.append('g').append("path")
        //     .datum( cpus )
        //     .attr("d", line)
        //     .style('fill','none')
        //     .style('opacity',0.5)
        //     .style("stroke", function(d) { return color( 'cpu' ); });

    });

    var timer = window.setTimeout(function() {
         window.location.reload();
     }, 5000);
});
