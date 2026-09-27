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
 create(){this.scene.start('menu')}
}
class Menu extends Phaser.Scene{
 constructor(){super('menu')}
 create(){
  this.cameras.main.setBackgroundColor('#111821');
  this.add.text(W/2,150,'VALEDOURO\nARCADE',{fontFamily:'monospace',fontSize:'64px',align:'center',color:'#e8d39b',stroke:'#000',strokeThickness:8}).setOrigin(.5);
  this.add.text(W/2,285,'PROTÓTIPO v0.0.4',{fontFamily:'monospace',fontSize:'20px',color:'#aaa'}).setOrigin(.5);
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
  this.player=this.add.rectangle(120,420,k==='brokk'?48:36,k==='brokk'?60:76,p.color);this.physics.add.existing(this.player);
  this.player.body.setCollideWorldBounds(true).setGravityY(900);this.physics.add.collider(this.player,this.ground);
  this.physics.world.staticBodies.entries.slice(1).forEach(b=>this.physics.add.collider(this.player,b.gameObject));
  this.player.hp=run.hp[k];this.player.maxHp=p.hp;this.player.iframes=0;this.player.nextAttack=0;this.player.blocking=false;this.player.heavyWindup=false;
  this.cursors=this.input.keyboard.createCursorKeys();this.wasd=this.input.keyboard.addKeys('W,A,S,D');this.keys=this.input.keyboard.addKeys('SHIFT');
  this.cameras.main.setBounds(0,0,2400,H);this.cameras.main.startFollow(this.player,true,.08,.08);
  this.enemies=this.physics.add.group();
  [620,880,1240,1490,1770,2140].forEach(x=>this.spawnEnemy(x));
  this.physics.add.collider(this.enemies,this.ground);
  this.physics.world.staticBodies.entries.slice(1).forEach(b=>this.physics.add.collider(this.enemies,b.gameObject));
  this.input.on('pointerdown',()=>this.attack());
  this.ammo=(k==='aurus'&&run.style==='bow')?20:null;
  this.ui=this.add.text(18,18,'',{fontFamily:'monospace',fontSize:'18px',color:'#fff',backgroundColor:'#000a',padding:{x:10,y:8}}).setScrollFactor(0).setDepth(20);
  this.help=this.add.text(18,H-38,'Mover: WASD/setas | Pular: Espaço | Atacar: clique'+(k==='mauricius'?' | Escudo: SHIFT':''),{fontFamily:'monospace',fontSize:'14px',color:'#fff'}).setScrollFactor(0).setDepth(20);
 }
 spawnEnemy(x){
  const e=this.add.rectangle(x,420,34,70,0x7b3030);this.physics.add.existing(e);
  e.body.setGravityY(900);e.hp=55;e.dir=-1;e.state='chase';e.nextAttack=0;e.attackDamage=5;
  this.enemies.add(e);
 }
 update(time){
  if(!this.player||!this.player.body)return;
  const p=roster[run.selected],left=this.cursors.left.isDown||this.wasd.A.isDown,right=this.cursors.right.isDown||this.wasd.D.isDown;
  this.player.blocking=run.selected==='mauricius'&&this.keys.SHIFT.isDown&&this.player.body.blocked.down;
  const moveSpeed=this.player.blocking?p.speed*.38:(this.player.heavyWindup?p.speed*.28:p.speed);
  this.player.body.setVelocityX(left?-moveSpeed:right?moveSpeed:0);
  if(this.player.blocking)this.player.setStrokeStyle(4,0xd9d2bd);else this.player.setStrokeStyle();
  if((Phaser.Input.Keyboard.JustDown(this.cursors.space)||Phaser.Input.Keyboard.JustDown(this.wasd.W)||Phaser.Input.Keyboard.JustDown(this.cursors.up))&&this.player.body.blocked.down)this.player.body.setVelocityY(-p.jump);
  if(this.player.iframes>0)this.player.iframes-=this.game.loop.delta;
  this.enemies.children.iterate(e=>{
   if(!e?.body)return;
   const d=this.player.x-e.x,dist=Math.abs(d);
   if(e.state==='windup'||e.state==='recover'){e.body.setVelocityX(0);return}
   if(dist>62){e.body.setVelocityX(Math.sign(d)*55);e.state='chase'}
   else{e.body.setVelocityX(0);if(time>=e.nextAttack)this.enemyAttack(e,Math.sign(d)||1)}
  });
  const ammo=this.ammo===null?'':(' | Flechas '+this.ammo+'/30'+(this.ammo<=0?' | ADAGA':''));
  this.ui.setText(p.name+' | HP '+Math.max(0,Math.ceil(this.player.hp))+'/'+p.hp+ammo);
 }
 attack(){
  if(!this.player?.body||this.player.blocking||this.player.heavyWindup||this.time.now<this.player.nextAttack)return;
  const p=roster[run.selected];
  if(run.selected==='brokk'){this.brokkHeavyAttack(p);return}
  const cooldown=run.selected==='mauricius'?360:run.selected==='cassandra'?240:300;
  this.player.nextAttack=this.time.now+cooldown;
  if(run.selected==='aurus'&&run.style==='bow'&&this.ammo>0){this.ammo--;this.shootArrow(p.damage);return}
  const world=this.input.activePointer.positionToCamera(this.cameras.main),dir=world.x>=this.player.x?1:-1;
  const reach=run.selected==='brokk'?52:run.selected==='cassandra'?48:60;
  const box=this.add.rectangle(this.player.x+dir*(reach*.72),this.player.y,reach,55,0xffdd88,.35);this.physics.add.existing(box);
  this.physics.add.overlap(box,this.enemies,(_,e)=>this.hitEnemy(e,p.damage,dir),null,this);
  this.time.delayedCall(90,()=>box.destroy());
 }
 brokkHeavyAttack(p){
  const world=this.input.activePointer.positionToCamera(this.cameras.main),dir=world.x>=this.player.x?1:-1;
  this.player.heavyWindup=true;this.player.nextAttack=this.time.now+720;
  const marker=this.add.text(this.player.x,this.player.y-52,'!',{fontFamily:'monospace',fontSize:'28px',color:'#f1c36f',stroke:'#000',strokeThickness:4}).setOrigin(.5);
  this.time.delayedCall(260,()=>{
   if(!this.player?.active){marker.destroy();return}
   marker.destroy();
   const box=this.add.rectangle(this.player.x+dir*38,this.player.y+5,62,62,0xffb24a,.42);this.physics.add.existing(box);box.body.setAllowGravity(false);
   let connected=false;
   this.physics.add.overlap(box,this.enemies,(_,e)=>{
    if(!e.active)return;connected=true;this.hitEnemy(e,p.damage+8,dir);
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
 hitEnemy(e,d,dir=1){
  if(!e.active)return;e.hp-=d;e.setFillStyle(0xd36b55);
  const push=run.selected==='brokk'?230:run.selected==='mauricius'?120:70;
  e.body.setVelocityX(dir*push);
  this.time.delayedCall(80,()=>e.active&&e.setFillStyle(0x7b3030));if(e.hp<=0)e.destroy()
 }
 enemyAttack(e,dir){
  if(!e.active||e.state==='windup'||e.state==='recover')return;
  e.state='windup';e.setFillStyle(0xb85b3f);
  this.time.delayedCall(260,()=>{
   if(!e.active)return;
   const hit=this.add.rectangle(e.x+dir*32,e.y,42,48,0xff7b55,.25);this.physics.add.existing(hit);hit.body.setAllowGravity(false);
   let landed=false;
   this.physics.add.overlap(hit,this.player,()=>{if(!landed){landed=true;this.hurtPlayer(e,dir)}},null,this);
   this.time.delayedCall(110,()=>hit.active&&hit.destroy());
   e.state='recover';e.setFillStyle(0x5f2424);
   this.time.delayedCall(520,()=>{if(e.active){e.state='chase';e.nextAttack=this.time.now+500;e.setFillStyle(0x7b3030)}});
  });
 }
 hurtPlayer(e,dir){
  if(this.player.iframes>0)return;
  const incoming=e.attackDamage||5;
  const blocked=this.player.blocking&&run.selected==='mauricius';
  const damage=blocked?Math.max(1,Math.ceil(incoming*.2)):incoming;
  this.player.hp-=damage;run.hp[run.selected]=this.player.hp;this.player.iframes=blocked?420:700;
  this.player.body.setVelocityX((dir||Math.sign(this.player.x-e.x)||1)*(blocked?35:120));this.player.body.setVelocityY(blocked?0:-90);
  if(blocked){const flash=this.add.text(this.player.x,this.player.y-58,'BLOQUEIO!',{fontFamily:'monospace',fontSize:'13px',color:'#f4df9b'}).setOrigin(.5);this.tweens.add({targets:flash,y:flash.y-18,alpha:0,duration:420,onComplete:()=>flash.destroy()})}
  this.cameras.main.shake(70,.004);this.player.setAlpha(.55);
  this.time.delayedCall(120,()=>this.player?.active&&this.player.setAlpha(1));
  if(this.player.hp<=0)this.die()
 }
 die(){run.hp[run.selected]=0;run.dead.add(run.selected);this.physics.pause();this.add.text(W/2,H/2,'DERROTADO',{fontFamily:'monospace',fontSize:'56px',color:'#d55',stroke:'#000',strokeThickness:8}).setOrigin(.5).setScrollFactor(0).setDepth(30);this.time.delayedCall(1300,()=>this.scene.start('select'))}
}
new Phaser.Game({type:Phaser.AUTO,width:W,height:H,parent:'game',pixelArt:true,physics:{default:'arcade',arcade:{gravity:{y:0},debug:false}},scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[Boot,Menu,Select,Game]});