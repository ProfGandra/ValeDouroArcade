const W=960,H=540;
const roster={
 mauricius:{name:'Mauricius',hp:100,speed:210,jump:430,damage:30,color:0x4169a1},
 cassandra:{name:'Cassandra Arven',hp:90,speed:235,jump:450,damage:25,color:0x6f9b68},
 aurus:{name:'Aurus',hp:85,speed:250,jump:470,damage:22,color:0x8a6b45},
 brokk:{name:'Brokk Pedra-Funda',hp:125,speed:180,jump:380,damage:38,color:0x8c5b3e}
};
const run={dead:new Set(),selected:null,style:'blade',hp:{}};
Object.keys(roster).forEach(k=>run.hp[k]=roster[k].hp);

class Boot extends Phaser.Scene{
 constructor(){super('boot')}
 create(){this.makePixelTextures();this.scene.start('menu')}
 makePixelTextures(){
  const make=(key,w,h,draw)=>{const g=this.make.graphics({x:0,y:0,add:false});draw(g);g.generateTexture(key,w,h);g.destroy()};
  make('mauricius',36,76,g=>{g.fillStyle(0x273746).fillRect(8,2,20,10);g.fillStyle(0xd6ad83).fillRect(10,12,16,14);g.fillStyle(0x3f6090).fillRect(7,26,22,30);g.fillStyle(0x9aa5ad).fillRect(2,28,7,28);g.fillStyle(0x6e4d2f).fillRect(10,56,7,20).fillRect(21,56,7,20);g.fillStyle(0xd7d7d7).fillRect(29,25,3,34)});
  make('cassandra',36,76,g=>{g.fillStyle(0xe3c39e).fillRect(10,8,16,16);g.fillStyle(0xd8c78b).fillTriangle(10,10,4,14,10,16).fillTriangle(26,10,32,14,26,16);g.fillStyle(0x395c48).fillRect(8,24,20,34);g.fillStyle(0xb7c2b1).fillRect(29,20,2,43);g.fillStyle(0x594334).fillRect(10,58,7,18).fillRect(21,58,7,18);g.fillStyle(0x5b4938).fillRect(9,2,18,7)});
  make('aurus',36,76,g=>{g.fillStyle(0x4b3526).fillRect(8,3,20,9);g.fillStyle(0xd1a477).fillRect(10,12,16,14);g.fillStyle(0x596743).fillRect(7,26,22,31);g.fillStyle(0x463526).fillRect(10,57,7,19).fillRect(21,57,7,19);g.lineStyle(3,0x8d6b3e).strokeCircle(30,35,9);g.fillStyle(0xc9b07a).fillRect(3,27,3,35)});
  make('brokk',48,60,g=>{g.fillStyle(0x4a3428).fillRect(11,2,26,10);g.fillStyle(0xd2a071).fillRect(13,12,22,13);g.fillStyle(0x754b2d).fillTriangle(12,23,36,23,24,43);g.fillStyle(0x6f563d).fillRect(7,25,34,22);g.fillStyle(0x4a3829).fillRect(10,47,10,13).fillRect(28,47,10,13);g.fillStyle(0xa7a7a7).fillRect(39,9,5,42);g.fillStyle(0x8a8a8a).fillRect(34,7,14,8)});
  make('enemyCommon',34,70,g=>{g.fillStyle(0x3b2525).fillRect(7,2,20,9);g.fillStyle(0xc18e72).fillRect(9,11,16,13);g.fillStyle(0x7b3030).fillRect(6,24,22,30);g.fillStyle(0x49302b).fillRect(8,54,7,16).fillRect(20,54,7,16);g.fillStyle(0xa8a8a8).fillRect(29,21,3,35)});
  make('enemyElite',46,90,g=>{g.fillStyle(0x29242a).fillRect(8,2,30,11);g.fillStyle(0xb98770).fillRect(12,13,22,15);g.fillStyle(0x4f2638).fillRect(6,28,34,39);g.fillStyle(0x342a2f).fillRect(9,67,10,23).fillRect(27,67,10,23);g.fillStyle(0x8d8d8d).fillRect(39,19,5,48)});
 }
}
}
class Menu extends Phaser.Scene{
 constructor(){super('menu')}
 create(){
  this.cameras.main.setBackgroundColor('#111821');
  this.add.text(W/2,150,'VALEDOURO\nARCADE',{fontFamily:'monospace',fontSize:'64px',align:'center',color:'#e8d39b',stroke:'#000',strokeThickness:8}).setOrigin(.5);
  this.add.text(W/2,285,'PROTÓTIPO v0.1.0',{fontFamily:'monospace',fontSize:'20px',color:'#aaa'}).setOrigin(.5);
  const b=this.add.text(W/2,365,'[ JOGAR ]',{fontFamily:'monospace',fontSize:'32px',color:'#fff',backgroundColor:'#563d27',padding:{x:20,y:12}}).setOrigin(.5).setInteractive({useHandCursor:true});
  b.on('pointerdown',()=>this.scene.start('select'));
  this.add.text(W/2,455,'WASD / setas: mover   ESPAÇO: pular   mouse: atacar',{fontFamily:'monospace',fontSize:'16px',color:'#999'}).setOrigin(.5);
 }
}
class Select extends Phaser.Scene{
 constructor(){super('select')}
 create(){
  this.cameras.main.setBackgroundColor('#171717');
  this.add.text(W/2,50,'ESCOLHA SEU COMBATENTE',{fontFamily:'monospace',fontSize:'30px',color:'#e8d39b'}).setOrigin(.5);
  const keys=Object.keys(roster), xs=[150,370,590,810];
  keys.forEach((k,i)=>{
   const p=roster[k],dead=run.dead.has(k);
   this.add.rectangle(xs[i],205,150,190,dead?0x333333:p.color).setStrokeStyle(4,dead?0x555555:0xd2bb82);
   this.add.rectangle(xs[i],170,k==='brokk'?65:48,k==='brokk'?75:105,dead?0x555555:0xe2c39f);
   this.add.text(xs[i],275,p.name,{fontFamily:'monospace',fontSize:'16px',align:'center',color:dead?'#777':'#fff',wordWrap:{width:145}}).setOrigin(.5);
   this.add.text(xs[i],310,dead?'DERROTADO':('HP '+Math.ceil(run.hp[k])+'/'+p.hp),{fontFamily:'monospace',fontSize:'14px',color:dead?'#b55':'#9d9'}).setOrigin(.5);
   if(!dead){
    const hit=this.add.rectangle(xs[i],205,150,190,0xffffff,0.001).setInteractive({useHandCursor:true});
    hit.on('pointerdown',()=>{run.selected=k;if(k==='aurus')this.showAurusChoice();else this.scene.start('game')});
   }
  });
  if(run.dead.size===4){
   this.add.text(W/2,400,'FIM DA CAMPANHA',{fontFamily:'monospace',fontSize:'36px',color:'#c44'}).setOrigin(.5);
   const r=this.add.text(W/2,455,'[ NOVA CAMPANHA ]',{fontFamily:'monospace',fontSize:'20px',color:'#fff'}).setOrigin(.5).setInteractive({useHandCursor:true});
   r.on('pointerdown',()=>{run.dead.clear();Object.keys(roster).forEach(k=>run.hp[k]=roster[k].hp);this.scene.restart()});
  }
 }
 showAurusChoice(){
  const shade=this.add.rectangle(W/2,H/2,W,H,0x000000,.78).setDepth(10);
  this.add.text(W/2,165,'AURUS — ESCOLHA O ESTILO',{fontFamily:'monospace',fontSize:'26px',color:'#e8d39b'}).setOrigin(.5).setDepth(11);
  const mk=(x,label,style)=>{const t=this.add.text(x,285,label,{fontFamily:'monospace',fontSize:'24px',color:'#fff',backgroundColor:'#493c2c',padding:{x:24,y:18}}).setOrigin(.5).setDepth(11).setInteractive({useHandCursor:true});t.on('pointerdown',()=>{run.style=style;this.scene.start('game')})};
  mk(350,'⚔ LÂMINA','blade');mk(610,'🏹 ARCO','bow');
 }
}
class Game extends Phaser.Scene{
 constructor(){super('game')}
 create(){
  this.cameras.main.setBackgroundColor('#91a88a');
  this.physics.world.setBounds(0,0,2400,H);
  this.add.rectangle(1200,505,2400,70,0x51432e);
  this.ground=this.add.rectangle(1200,490,2400,20,0x786a45);this.physics.add.existing(this.ground,true);
  [550,1050,1580,1950].forEach((x,i)=>{const p=this.add.rectangle(x,400-(i%2)*55,180,20,0x66573b);this.physics.add.existing(p,true)});
  const k=run.selected,p=roster[k];
  this.player=this.add.image(120,420,k);this.physics.add.existing(this.player);this.player.body.setSize(k==='brokk'?48:36,k==='brokk'?60:76);
  this.player.body.setCollideWorldBounds(true).setGravityY(900);this.physics.add.collider(this.player,this.ground);
  this.physics.world.staticBodies.entries.slice(1).forEach(b=>this.physics.add.collider(this.player,b.gameObject));
  this.player.hp=run.hp[k];this.player.maxHp=p.hp;this.player.iframes=0;this.player.nextAttack=0;this.player.blocking=false;this.player.heavyWindup=false;this.player.facing=1;this.player.comboStep=0;this.player.comboUntil=0;this.player.defenseStarted=0;this.player.shiftWasDown=false;this.player.dodging=false;this.player.dodgeUntil=0;this.player.nextDodge=0;
  this.cursors=this.input.keyboard.createCursorKeys();this.wasd=this.input.keyboard.addKeys('W,A,S,D');this.keys=this.input.keyboard.addKeys('SHIFT');
  this.cameras.main.setBounds(0,0,2400,H);this.cameras.main.startFollow(this.player,true,.08,.08);
  this.enemies=this.physics.add.group();
  [620,880,1240,1490,1770,2140].forEach((x,i)=>this.spawnEnemy(x,i===3?'elite':'common'));
  this.physics.add.collider(this.enemies,this.ground);
  this.physics.world.staticBodies.entries.slice(1).forEach(b=>this.physics.add.collider(this.enemies,b.gameObject));
  this.input.on('pointerdown',()=>this.attack());
  this.ammo=(k==='aurus'&&run.style==='bow')?20:null;
  this.ui=this.add.text(18,18,'',{fontFamily:'monospace',fontSize:'18px',color:'#fff',backgroundColor:'#000a',padding:{x:10,y:8}}).setScrollFactor(0).setDepth(20);
  this.help=this.add.text(18,H-38,'Mover: WASD/setas | Pular: Espaço | Atacar: clique | Defesa: SHIFT',{fontFamily:'monospace',fontSize:'14px',color:'#fff'}).setScrollFactor(0).setDepth(20);
 }
 spawnEnemy(x,type='common'){
  const elite=type==='elite';
  const e=this.add.image(x,elite?410:420,elite?'enemyElite':'enemyCommon');this.physics.add.existing(e);e.body.setSize(elite?46:34,elite?90:70);
  e.body.setGravityY(900);e.type=type;e.maxHp=elite?150:90;e.hp=e.maxHp;e.baseColor=elite?0x4f2638:0x7b3030;
  e.dir=-1;e.state='chase';e.nextAttack=0;e.attackDamage=elite?8:5;e.stunnedUntil=0;
  this.enemies.add(e);
 }
 update(time){
  if(!this.player||!this.player.body)return;
  const p=roster[run.selected],left=this.cursors.left.isDown||this.wasd.A.isDown,right=this.cursors.right.isDown||this.wasd.D.isDown;
  const shiftDown=this.keys.SHIFT.isDown;
  if(shiftDown&&!this.player.shiftWasDown)this.startDefense(time);
  this.player.shiftWasDown=shiftDown;
  this.updateDefense(time,shiftDown);
  const defenseSlow=this.player.blocking?(run.selected==='mauricius'?.38:run.selected==='brokk'?.5:.7):1;
  const moveSpeed=this.player.heavyWindup?p.speed*.28:p.speed*defenseSlow;
  if(!this.player.dodging)this.player.body.setVelocityX(left?-moveSpeed:right?moveSpeed:0);
  if(left&&!right)this.player.facing=-1;else if(right&&!left)this.player.facing=1;
  if((Phaser.Input.Keyboard.JustDown(this.cursors.space)||Phaser.Input.Keyboard.JustDown(this.wasd.W)||Phaser.Input.Keyboard.JustDown(this.cursors.up))&&this.player.body.blocked.down)this.player.body.setVelocityY(-p.jump);
  if(this.player.iframes>0)this.player.iframes-=this.game.loop.delta;
  this.enemies.children.iterate(e=>{
   if(!e?.body)return;
   if(e.stunnedUntil&&time<e.stunnedUntil){e.body.setVelocityX(0);return}
   if(e.stunnedUntil&&time>=e.stunnedUntil){e.stunnedUntil=0;e.state='chase';e.setTint(e.baseColor)}
   const d=this.player.x-e.x,dist=Math.abs(d);
   if(e.state==='windup'||e.state==='recover'){e.body.setVelocityX(0);return}
   if(dist>62){e.body.setVelocityX(Math.sign(d)*55);e.state='chase'}
   else{e.body.setVelocityX(0);if(time>=e.nextAttack)this.enemyAttack(e,Math.sign(d)||1)}
  });
  const ammo=this.ammo===null?'':(' | Flechas '+this.ammo+'/30'+(this.ammo<=0?' | ADAGA':''));
  this.ui.setText(p.name+' | HP '+Math.max(0,Math.ceil(this.player.hp))+'/'+p.hp+ammo);
 }
 startDefense(time){
  const k=run.selected;
  if(k==='aurus'){
   if(time<this.player.nextDodge||this.player.dodging)return;
   this.player.dodging=true;this.player.blocking=false;this.player.dodgeUntil=time+260;this.player.nextDodge=time+780;this.player.iframes=Math.max(this.player.iframes,260);
   this.player.body.setVelocityX(this.player.facing*360);this.player.setAlpha(.55);return
  }
  if(!this.player.body.blocked.down)return;
  this.player.blocking=true;this.player.defenseStarted=time;
 }
 updateDefense(time,shiftDown){
  if(run.selected==='aurus'){
   if(this.player.dodging&&time>=this.player.dodgeUntil){this.player.dodging=false;this.player.setAlpha(1)}
   return
  }
  this.player.blocking=shiftDown&&this.player.body.blocked.down;
  if(this.player.blocking){this.player.setTint(run.selected==='mauricius'?0xd9d2bd:run.selected==='cassandra'?0xbfe7d0:0xd3a76a)}else this.player.clearTint();
 }
 attack(){
  if(!this.player?.body||this.player.blocking||this.player.heavyWindup||this.time.now<this.player.nextAttack)return;
  const p=roster[run.selected];
  if(run.selected==='brokk'){this.brokkHeavyAttack(p);return}
  if(run.selected==='cassandra'){this.cassandraComboAttack(p);return}
  const cooldown=run.selected==='mauricius'?360:300;
  this.player.nextAttack=this.time.now+cooldown;
  if(run.selected==='aurus'&&run.style==='bow'&&this.ammo>0){this.ammo--;this.shootArrow(p.damage);return}
  const dir=this.player.facing;
  const reach=run.selected==='brokk'?52:run.selected==='cassandra'?48:60;
  const box=this.add.rectangle(this.player.x+dir*(reach*.72),this.player.y,reach,55,0xffdd88,.35);this.physics.add.existing(box);
  this.physics.add.overlap(box,this.enemies,(_,e)=>this.hitEnemy(e,p.damage,dir),null,this);
  this.time.delayedCall(90,()=>box.destroy());
 }
 cassandraComboAttack(p){
  if(this.time.now>this.player.comboUntil)this.player.comboStep=0;
  this.player.comboStep=(this.player.comboStep%3)+1;
  const step=this.player.comboStep,dir=this.player.facing;
  const data={
   1:{damage:18,reach:50,cooldown:190,push:45},
   2:{damage:20,reach:54,cooldown:205,push:60},
   3:{damage:30,reach:62,cooldown:330,push:135}
  }[step];
  this.player.nextAttack=this.time.now+data.cooldown;
  this.player.comboUntil=this.time.now+520;
  if(step===3)this.player.body.setVelocityX(dir*145);
  const yOffset=step===2?-8:step===3?5:0;
  const box=this.add.rectangle(this.player.x+dir*(data.reach*.7),this.player.y+yOffset,data.reach,50,step===3?0xffe28a:0xd8f0c8,step===3?.48:.32);
  this.physics.add.existing(box);box.body.setAllowGravity(false);
  const hitThisSwing=new Set();
  this.physics.add.overlap(box,this.enemies,(_,e)=>{
   if(!e.active||hitThisSwing.has(e))return;
   hitThisSwing.add(e);this.hitEnemy(e,data.damage,dir,{push:data.push});
  },null,this);
  if(step===3){
   const txt=this.add.text(this.player.x,this.player.y-55,'3',{fontFamily:'monospace',fontSize:'16px',color:'#ffe49a'}).setOrigin(.5);
   this.tweens.add({targets:txt,y:txt.y-15,alpha:0,duration:300,onComplete:()=>txt.destroy()});
  }
  this.time.delayedCall(step===3?125:85,()=>box.active&&box.destroy());
  if(step===3)this.player.comboUntil=0;
 }
 brokkHeavyAttack(p){
  const dir=this.player.facing;
  this.player.heavyWindup=true;this.player.nextAttack=this.time.now+720;
  const marker=this.add.text(this.player.x,this.player.y-52,'!',{fontFamily:'monospace',fontSize:'28px',color:'#f1c36f',stroke:'#000',strokeThickness:4}).setOrigin(.5);
  this.time.delayedCall(260,()=>{
   if(!this.player?.active){marker.destroy();return}
   marker.destroy();
   const box=this.add.rectangle(this.player.x+dir*38,this.player.y+5,62,62,0xffb24a,.42);this.physics.add.existing(box);box.body.setAllowGravity(false);
   let connected=false;
   const hitThisSwing=new Set();
   this.physics.add.overlap(box,this.enemies,(_,e)=>{
    if(!e.active||hitThisSwing.has(e))return;
    hitThisSwing.add(e);connected=true;
    const critical=Phaser.Math.Between(1,100)<=10;
    this.hitEnemy(e,p.damage+8,dir,{brokk:true,critical});
   },null,this);
   this.time.delayedCall(115,()=>{
    if(connected)this.cameras.main.shake(105,.009);
    if(box.active)box.destroy();
   });
   this.player.heavyWindup=false;
  });
 }
 shootArrow(dmg){
  const world=this.input.activePointer.positionToCamera(this.cameras.main),a=Phaser.Math.Angle.Between(this.player.x,this.player.y,world.x,world.y);
  const ar=this.add.rectangle(this.player.x,this.player.y,20,4,0xe5d39a);this.physics.add.existing(ar);ar.body.setAllowGravity(false);ar.rotation=a;this.physics.velocityFromRotation(a,620,ar.body.velocity);
  this.physics.add.overlap(ar,this.enemies,(_,e)=>{this.hitEnemy(e,dmg+8,Math.sign(ar.body.velocity.x)||1);ar.destroy()},null,this);
  this.time.delayedCall(1600,()=>ar.active&&ar.destroy());
 }
 hitEnemy(e,d,dir=1,opts={}){
  if(!e.active)return;
  if(opts.brokk&&opts.critical){
   if(e.type==='common'){this.brokkCriticalLaunch(e,dir);return}
   e.hp-=Math.round(d*1.5);e.stunnedUntil=this.time.now+1800;e.state='stunned';e.body.setVelocityX(dir*95);e.setTint(0xd8a64a);
   const stun=this.add.text(e.x,e.y-62,'STUN!',{fontFamily:'monospace',fontSize:'14px',color:'#ffe08a',stroke:'#000',strokeThickness:3}).setOrigin(.5);
   this.tweens.add({targets:stun,y:stun.y-20,alpha:0,duration:700,onComplete:()=>stun.destroy()});
   this.cameras.main.shake(120,.011);if(e.hp<=0)e.destroy();return
  }
  e.hp-=d;e.setTint(0xd36b55);
  const push=opts.push??(run.selected==='brokk'?230:run.selected==='mauricius'?120:70);
  e.body.setVelocityX(dir*push);
  this.time.delayedCall(80,()=>e.active&&e.clearTint());if(e.hp<=0)e.destroy()
 }
 brokkCriticalLaunch(e,dir){
  e.state='launched';e.body.setAllowGravity(false);e.body.setVelocity(dir*760,-210);e.body.setAngularVelocity(dir*720);
  e.setTint(0xffc15a);this.cameras.main.shake(150,.014);
  const crit=this.add.text(e.x,e.y-58,'CRÍTICO!',{fontFamily:'monospace',fontSize:'18px',color:'#ffd56a',stroke:'#000',strokeThickness:4}).setOrigin(.5);
  this.tweens.add({targets:crit,y:crit.y-28,alpha:0,duration:650,onComplete:()=>crit.destroy()});
  this.time.delayedCall(900,()=>e.active&&e.destroy());
 }
 enemyAttack(e,dir){
  if(!e.active||e.state==='windup'||e.state==='recover')return;
  e.state='windup';e.setTint(0xb85b3f);
  this.time.delayedCall(260,()=>{
   if(!e.active)return;
   const hit=this.add.rectangle(e.x+dir*32,e.y,42,48,0xff7b55,.25);this.physics.add.existing(hit);hit.body.setAllowGravity(false);
   let landed=false;
   this.physics.add.overlap(hit,this.player,()=>{if(!landed){landed=true;this.hurtPlayer(e,dir)}},null,this);
   this.time.delayedCall(110,()=>hit.active&&hit.destroy());
   e.state='recover';e.setTint(0x5f2424);
   this.time.delayedCall(520,()=>{if(e.active){e.state='chase';e.nextAttack=this.time.now+500;e.setFillStyle(0x7b3030)}});
  });
 }
 hurtPlayer(e,dir){
  if(this.player.iframes>0)return;
  const incoming=e.attackDamage||5;
  const attackerSide=Math.sign(e.x-this.player.x)||1;
  const frontal=attackerSide===this.player.facing;
  const k=run.selected;
  let damage=incoming,defended=false,parried=false;
  if(this.player.blocking&&frontal){
   defended=true;
   if(k==='mauricius')damage=Math.max(1,Math.ceil(incoming*.2));
   else if(k==='cassandra'){
    parried=(this.time.now-this.player.defenseStarted)<=300;
    damage=parried?0:Math.max(1,Math.ceil(incoming*.6));
   }else if(k==='brokk')damage=Math.max(1,Math.ceil(incoming*.5));
  }
  this.player.hp-=damage;run.hp[run.selected]=this.player.hp;this.player.iframes=parried?300:defended?420:700;
  this.player.body.setVelocityX((dir||Math.sign(this.player.x-e.x)||1)*(defended?35:120));this.player.body.setVelocityY(defended?0:-90);
  if(parried){
   e.state='recover';e.nextAttack=this.time.now+800;e.body.setVelocityX(-this.player.facing*120);e.setTint(0xc7b16b);
   this.time.delayedCall(420,()=>e.active&&e.clearTint());
  }
  if(defended){const label=parried?'APAROU!':k==='mauricius'?'BLOQUEIO!':k==='cassandra'?'GUARDA!':'DEFESA!';const flash=this.add.text(this.player.x,this.player.y-58,label,{fontFamily:'monospace',fontSize:'13px',color:'#f4df9b'}).setOrigin(.5);this.tweens.add({targets:flash,y:flash.y-18,alpha:0,duration:420,onComplete:()=>flash.destroy()})}
  this.cameras.main.shake(70,.004);this.player.setAlpha(.55);
  this.time.delayedCall(120,()=>this.player?.active&&this.player.setAlpha(1));
  if(this.player.hp<=0)this.die()
 }
 die(){run.hp[run.selected]=0;run.dead.add(run.selected);this.physics.pause();this.add.text(W/2,H/2,'DERROTADO',{fontFamily:'monospace',fontSize:'56px',color:'#d55',stroke:'#000',strokeThickness:8}).setOrigin(.5).setScrollFactor(0).setDepth(30);this.time.delayedCall(1300,()=>this.scene.start('select'))}
}
new Phaser.Game({type:Phaser.AUTO,width:W,height:H,parent:'game',pixelArt:true,physics:{default:'arcade',arcade:{gravity:{y:0},debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[Boot,Menu,Select,Game]});