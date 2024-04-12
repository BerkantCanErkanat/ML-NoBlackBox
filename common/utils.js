const utils={};

utils.flaggedUsers=
   [1663882102141,1663900040545,1664485938220];

utils.styles={
   car:{color:'gray',text:'🚗'},
   fish:{color:'red',text:'🐠'},
   house:{color:'yellow',text:'🏠'},
   tree:{color:'green',text:'🌳'},
   bicycle:{color:'cyan',text:'🚲'},
   guitar:{color:'blue',text:'🎸'},
   pencil:{color:'magenta',text:'✏️'},
   clock:{color:'lightgray',text:'🕒'},
};
utils.styles["?"]={color:'red',text:'❓'};

utils.formatPercent=(n)=>{
   return (n*100).toFixed(2)+"%";
}

utils.printProgress=(count,max)=>{
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   const percent=utils.formatPercent(
      count/max
   );
   process.stdout.write(count+"/"+max+
      " ("+percent+")"
   );
}

utils.groupBy=(objArray,key)=>{
   const groups={};
   for(let obj of objArray){
      const val=obj[key];
      if(groups[val]==null){
         groups[val]=[];
      }
      groups[val].push(obj);
   }
   return groups;
}

utils.distance=(p1,p2)=>{
   return Math.sqrt(
      (p1[0]-p2[0])**2+
      (p1[1]-p2[1])**2
   );
}

utils.getNearest=(loc,points,k=1)=>{
   const obj=points.map((val,ind)=>{
      return {ind,val}
   });
   const sorted=obj.sort((a,b)=>{
      return utils.distance(loc,a.val)-
         utils.distance(loc,b.val)
   });
   const indices=sorted.map((obj)=>obj.ind);
   return indices.slice(0,k);
}

utils.invLerp=(a,b,v)=>{
   return (v-a)/(b-a);
}

utils.normalizePoints=(points,minMax)=>{
   // points = [[w1,h1,p1,c1],[w2,h2,p2,c2]... sample.length-1]
   //minMax cizdigimiz seyin real time da normalize olması icin var
   let min,max;
   const dimensions=points[0].length;
   if(minMax){
      min=minMax.min;
      max=minMax.max;
   }else{
      min=[...points[0]]; //[w1,h1,p1,c1]
      max=[...points[0]]; //[w1,h1,p1,c1]
      for(let i=1;i<points.length;i++){ //i = sample1,sample2 ... diye gider
         for(let j=0;j<dimensions;j++){ //featurelar feature1 feature2 ..
            min[j]=Math.min(min[j],points[i][j]);
            max[j]=Math.max(max[j],points[i][j]);
         }
      }
   }
   for(let i=0;i<points.length;i++){
      for(let j=0;j<dimensions;j++){
         points[i][j]=
            utils.invLerp(min[j],max[j],points[i][j]);
      }
   }
   return {min,max};
}

if(typeof module!=='undefined'){
   module.exports=utils;
}