playing = false
result = false
phone = false

--[[
 dropAmount: the amount of letters to drop for the minigame to finish.
 Letter: The lettersets. Check config for more info. There are 5 lettersets.
 speed: the speed whith wich the letters move on the phone.
 inter: interval time between each letter.
--]]

function doMinigame(dropAmount,letter,speed,inter) --The main function for the minigame.
    globalPed = GetPlayerPed(-1)

    openPhone()
    playMinigame(dropAmount,letter,speed,inter)
    
    if(Config.DoAnimation)then
        DoAnimation()
    end

    playing = true

    while playing do
      if IsEntityDead(globalPed) then 
        ClearPedTasks(GetPlayerPed(-1))
        closePhone()
      end
      Citizen.Wait(100)
    end

    return result
end

function DoAnimation() --Just the animation. Runs while playing is true.
    dict = 'veh@break_in@0h@p_m_one@'

    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        RequestAnimDict(dict)
        Citizen.Wait(1)
    end

    Citizen.CreateThread(function()
        while playing do
            if not IsEntityPlayingAnim(globalPed, dict, "low_force_entry_ds", 3) then
                TaskPlayAnim(globalPed, dict, "low_force_entry_ds", 1.0, 1.0, 1.0, 1, 0.0, 0, 0, 0)
                Citizen.Wait(1500)
                ClearPedTasks(globalPed)
            end
            Citizen.Wait(1)
        end
        ClearPedTasks(globalPed)
    end)
end

  
function playMinigame(dropAmount,letter,speed,inter) 
    SendNUIMessage({openSection = "playMinigame", amount = dropAmount,letterSet = letter,speed = speed,interval = inter})
end
  
function openPhone() --Opens Phone.
    phone = true
    SetNuiFocus(true,true)
    SendNUIMessage({openPhone = true})
end

function closePhone() --Closes Phone.
      playing = false
      phone = false
      SetNuiFocus(false,false)
      SendNUIMessage({openPhone = false})
end

function doFire(coords, time, maxChildren, isGasFire, isBig) --Does fire locally, then sends to server.

    if(coords == nil)then
        coords = GetEntityCoords(GetPlayerPed(-1))
    end

    if(time == nil)then
        time = 45
    end

    if(maxChildren == nil)then
        maxChildren = 5
    end

    if(isGasFire == nil)then
        isGasFire = false
    end

    if(isBig == nil)then
        isBig = false
    end

    k = math.random(Config.LowestAmountOfFires, Config.HighestAmountOfFires)
    for i = 1, k, 1 do
        TriggerServerEvent("thermite:StartServerFire", coords, maxChildren, isGasFire, isBig)
    end
    Citizen.Wait(time * 1000)
    TriggerServerEvent("thermite:StopFires")
end

function doExplosion(coords, type, scale) --Does explosion locally, sends to server.

    if(coords == nil)then
        coords = GetEntityCoords(GetPlayerPed(-1))
    end

    if(type == nil)then
        type = 1
    end

    if(scale == nil)then
        scale = 2
    end

    TriggerServerEvent("thermite:doServerExplosion", coords, type, scale)
end