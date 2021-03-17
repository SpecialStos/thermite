# thermite
A thermite minigame for FiveM.

Hey there,

this is a resource made by SpecialStos.

You are not allowed to sell this script by any means, this is a free script just for the general FiveM population.

If you do need any support feel free to hop on discord or make an issue through github.

Discord Server: https://discord.voxit.xyz My Personal Discord: SpecialStos#0001

Don't forget to check out our Tebex store for resource you are able to purchase: https://store.voxit.xyz

Exports: 
1) exports['thermite']:doMinigame(30,5,5,400) 
  
  30 - dropAmount: the amount of letters to drop for the minigame to finish.
  5 - Letter: The lettersets. Check config for more info. There are 5 lettersets.
  5 - speed: the speed whith wich the letters move on the phone.
  5 - inter: interval time between each letter.
  
2) exports['thermite']:doExplosion(globalPedPos, 1, 10)

  globalPedPos: Entity coords.
  1: Explosion Type.
  10: Scale of Explosion.
  
3) exports['thermite']:doFire(globalPedPos, 45, 5, false, true)

  globalPedPos: Entity coords.
  45: time in seconds until fire stops.
  5: Max Children in each fire. 
  false: Is gas fire.
  true: Is a big fire.
