local currentFires = {}

RegisterNetEvent("thermite:StartFire") --Starts the fire here.
AddEventHandler("thermite:StartFire", function(coords, maxChildren, isGasFire, isBig)
    if GetDistanceBetweenCoords(coords.x, coords.y, coords.z, GetEntityCoords(GetPlayerPed(-1))) < Config.MaxFireDistance then
        local pos = {
            x = coords.x, 
            y = coords.y,
            z = coords.z,
        }
        pos.z = pos.z - 0.9

        local fire = StartScriptFire(pos.x, pos.y, pos.z, maxChildren, isGasFire)
        table.insert(currentFires, fire)

        if(isBig)then
          local fireRandom = StartScriptFire(pos.x + math.random(-2, 2), pos.y + math.random(-2, 2), pos.z - 1, maxChildren, isGasFire)
          table.insert(currentFires, fireRandom)
        end
    end
end)

RegisterNetEvent("thermite:doExplosion") --Does the explosion here.
AddEventHandler("thermite:doExplosion", function(coords, type, scale)
    if GetDistanceBetweenCoords(coords.x, coords.y, coords.z, GetEntityCoords(GetPlayerPed(-1))) < Config.MaxExplosionDistance then
      local pos = {
        x = coords.x, 
        y = coords.y,
        z = coords.z,
    }
      AddExplosion(pos.x, pos.y, pos.z, type, scale, true, false, 0)
    end
end)

RegisterNetEvent("thermite:StopFires") --Stops the fires.
AddEventHandler("thermite:StopFires", function()
    for k, v in ipairs(currentFires) do
        RemoveScriptFire(v)
    end
end)

RegisterNUICallback('close', function(data, cb) --Closes Phone with escape.
  closePhone()
  result = false
  cb('ok')
end)

RegisterNUICallback('failure', function(data, cb) --Triggers when you fail.
  result = false
  closePhone()
  cb('ok')
end)

RegisterNUICallback('complete', function(data, cb) --Triggers when you complete
  result = true
  closePhone()
  cb('ok')
end)


