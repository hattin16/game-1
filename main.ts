function プレイヤー移動ボタン () {
    if (input.buttonIsPressed(Button.A) && !(input.buttonIsPressed(Button.AB))) {
        player.change(LedSpriteProperty.X, -1)
        basic.pause(100)
    }
    if (input.buttonIsPressed(Button.B) && !(input.buttonIsPressed(Button.AB))) {
        player.change(LedSpriteProperty.X, 1)
        basic.pause(100)
    }
    if (敵.get(LedSpriteProperty.Y) == 4) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        game.gameOver()
    }
}
function プレイヤー移動x () {
    加速度x = input.acceleration(Dimension.X)
    if (加速度x > 50) {
        player.change(LedSpriteProperty.X, 1)
    } else if (加速度x < -50) {
        player.change(LedSpriteProperty.X, -1)
    }
}
function 敵の動き () {
    敵のスピード = randint(2, 5)
    while (!(敵.get(LedSpriteProperty.Y) == 4)) {
        basic.pause(ゲームスピード * 敵のスピード)
        敵.change(LedSpriteProperty.Y, 1)
    }
    basic.pause(ゲームスピード * 敵のスピード)
    敵.delete()
    敵.change(LedSpriteProperty.Y, 1)
    basic.pause(randint(1, 5) * ゲームスピード)
    敵 = game.createSprite(randint(0, 4), 0)
}
let 敵のy = 0
let 敵のスピード = 0
let 加速度x = 0
let 敵: game.LedSprite = null
let player: game.LedSprite = null
let ゲームスピード = 0
ゲームスピード = 200
player = game.createSprite(4, 4)
let ロケット = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
敵 = game.createSprite(randint(0, 4), 0)
let 操作方法 = 1
game.setLife(3)
basic.forever(function () {
    if (操作方法 == 0) {
        プレイヤー移動x()
        basic.pause(ゲームスピード)
    } else {
        プレイヤー移動ボタン()
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        for (let index = 0; index < 4; index++) {
            ロケット.change(LedSpriteProperty.Y, -1)
            basic.pause(ゲームスピード)
        }
        ロケット.set(LedSpriteProperty.Y, 4)
    } else {
        ロケット.set(LedSpriteProperty.X, player.get(LedSpriteProperty.X))
        ロケット.set(LedSpriteProperty.Y, player.get(LedSpriteProperty.Y))
    }
})
basic.forever(function () {
    敵のy = 敵.get(LedSpriteProperty.Y)
})
basic.forever(function () {
    敵の動き()
})
basic.forever(function () {
    if (ロケット.isTouching(敵) && !(player.isTouching(敵))) {
        敵.delete()
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.BaDing), music.PlaybackMode.InBackground)
        game.addScore(1)
        basic.pause(randint(1, 5) * ゲームスピード)
        敵 = game.createSprite(randint(0, 4), 0)
    }
})
