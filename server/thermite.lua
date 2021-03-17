RegisterServerEvent('thermite:StartServerFire') --Starts fire.
AddEventHandler('thermite:StartServerFire', function(coords, maxChildren, isGasFire, isBig)
    TriggerClientEvent("thermite:StartFire", -1, coords, maxChildren, isGasFire, isBig)
end)

RegisterServerEvent('thermite:StopFires') --Stops fire.
AddEventHandler('thermite:StopFires', function()
    TriggerClientEvent("thermite:StopFires", -1)
end)

RegisterServerEvent('thermite:doServerExplosion') --Does the explosion.
AddEventHandler('thermite:doServerExplosion', function(coords, type, scale)
    TriggerClientEvent("thermite:doExplosion", -1, coords, type, scale)
end)