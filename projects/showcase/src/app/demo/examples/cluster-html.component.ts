import { Component, Input, OnInit } from '@angular/core';
import {
  CircleLayerSpecification,
  SymbolLayerSpecification,
} from 'maplibre-gl';

/**
 * Remember: mgl-layer are way faster than html markers
 * Html markers are fine if you don't have lots of points
 * Try to draw your point with a mgl-layer before using html markers
 * This example only use html markers for cluster points
 * Look at ngx-cluster-html example if you need markers for all points
 */

// colors to use for the categories
const COLORS = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c'];

@Component({
  selector: 'showcase-demo',
  template: `
    <mgl-map
      [style]="
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL'
      "
      [zoom]="[0.3]"
      [center]="[0, 20]"
    >
      <mgl-geojson-source
        id="earthquakes"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        [cluster]="true"
        [clusterRadius]="80"
        [clusterProperties]="clusterProperties"
      ></mgl-geojson-source>
      <mgl-markers-for-clusters source="earthquakes">
        <ng-template mglClusterPoint let-feature>
          <showcase-cluster-point
            [properties]="feature.properties"
          ></showcase-cluster-point>
        </ng-template>
      </mgl-markers-for-clusters>
      <mgl-layer
        id="earthquake_circle"
        type="circle"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [paint]="circlePaint"
      ></mgl-layer>
      <mgl-layer
        id="earthquake_label"
        type="symbol"
        source="earthquakes"
        [filter]="['!=', 'cluster', true]"
        [layout]="labelLayout"
        [paint]="labelPaint"
      ></mgl-layer>
    </mgl-map>
  `,
  styleUrls: ['./examples.css'],
})
export class ClusterHtmlComponent {
  clusterProperties: any;
  circlePaint: CircleLayerSpecification['paint'];
  labelLayout: SymbolLayerSpecification['layout'];
  labelPaint: SymbolLayerSpecification['paint'];

  constructor() {
    // filters for classifying earthquakes into five categories based on magnitude
    const mag1 = ['<', ['get', 'mag'], 2];
    const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
    const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
    const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
    const mag5 = ['>=', ['get', 'mag'], 5];

    this.clusterProperties = {
      // keep separate counts for each magnitude category in a cluster
      mag1: ['+', ['case', mag1, 1, 0]],
      mag2: ['+', ['case', mag2, 1, 0]],
      mag3: ['+', ['case', mag3, 1, 0]],
      mag4: ['+', ['case', mag4, 1, 0]],
      mag5: ['+', ['case', mag5, 1, 0]],
    };
    this.circlePaint = {
      'circle-color': [
        'case',
        mag1,
        COLORS[0],
        mag2,
        COLORS[1],
        mag3,
        COLORS[2],
        mag4,
        COLORS[3],
        COLORS[4],
      ],
      'circle-opacity': 0.6,
      'circle-radius': 12,
    };
    this.labelLayout = {
      // typings issue
      'text-field': <any>[
        'number-format',
        ['get', 'mag'],
        { 'min-fraction-digits': 1, 'max-fraction-digits': 1 },
      ],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 10,
    };
    this.labelPaint = {
      'text-color': ['case', ['<', ['get', 'mag'], 3], 'black', 'white'],
    };
  }
}

@Component({
  selector: 'showcase-cluster-point',
  template: `
    <svg
      [attr.width]="w"
      [attr.height]="w"
      [attr.viewbox]="viewbox"
      text-anchor="middle"
      [ngStyle]="{ font: font }"
    >
      <path
        *ngFor="let segment of segments"
        [attr.d]="segment.d"
        [ngStyle]="{ fill: segment.fill }"
      />
      <circle [attr.cx]="r" [attr.cy]="r" [attr.r]="r0" fill="white" />
      <text dominant-baseline="central" [attr.transform]="textTransform">
        {{ totalString }}
      </text>
    </svg>
  `,
})
export class ClusterPointComponent implements OnInit {
  @Input() properties: any;

  w: number;
  r: number;
  r0: number;
  viewbox: string;
  font: string;
  segments: { d: string; fill: string }[];
  textTransform: string;
  totalString: string;

  ngOnInit() {
    const offsets = [];
    const counts = [
      this.properties.mag1,
      this.properties.mag2,
      this.properties.mag3,
      this.properties.mag4,
      this.properties.mag5,
    ];
    let total = 0;
    for (let i = 0; i < counts.length; i++) {
      offsets.push(total);
      total += counts[i];
    }
    const fontSize =
      total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
    this.font = `${fontSize}px sans-serif`;
    this.r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
    this.r0 = Math.round(this.r * 0.6);
    this.w = this.r * 2;
    this.viewbox = `0 0 ${this.w} ${this.w}`;
    this.textTransform = `translate(${this.r}, ${this.r})`;
    this.segments = [];
    for (let i = 0; i < counts.length; i++) {
      this.segments.push(
        this.donutSegment(
          offsets[i] / total,
          (offsets[i] + counts[i]) / total,
          COLORS[i]
        )
      );
    }
    this.totalString = total.toLocaleString();
  }

  private donutSegment(start: number, end: number, color: string) {
    if (end - start === 1) {
      end -= 0.00001;
    }
    const a0 = 2 * Math.PI * (start - 0.25);
    const a1 = 2 * Math.PI * (end - 0.25);
    const x0 = Math.cos(a0),
      y0 = Math.sin(a0);
    const x1 = Math.cos(a1),
      y1 = Math.sin(a1);
    const largeArc = end - start > 0.5 ? 1 : 0;
    return {
      // tslint:disable-next-line:max-line-length
      d: `M ${this.r + this.r0 * x0} ${this.r + this.r0 * y0} L ${
        this.r + this.r * x0
      } ${this.r + this.r * y0} A ${this.r} ${this.r} 0 ${largeArc} 1 ${
        this.r + this.r * x1
      } ${this.r + this.r * y1} L ${this.r + this.r0 * x1} ${
        this.r + this.r0 * y1
      } A ${this.r0} ${this.r0} 0 ${largeArc} 0 ${this.r + this.r0 * x0} ${
        this.r + this.r0 * y0
      }`,
      fill: color,
    };
  }
}
