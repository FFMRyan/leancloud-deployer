(function () {

    function boot () {

        // retrieve minified raw assets
        var rawAssets = _FireSettings.rawAssets;
        for (var uuid in rawAssets) {
            var info = rawAssets[uuid];
            if (typeof info === 'object') {
                if (Array.isArray(info)) {
                    rawAssets[uuid] = {url: info[0], raw: false};
                }
            }
            else {
                rawAssets[uuid] = {url: info, raw: true};
            }
        }

        // init engine
        var canvas, div;
        //var width = 640, height = 480;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
            div = document.getElementById('GameDiv');

            //width = div.clientWidth;
            //height = div.clientHeight;
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            //cc.view.setDesignResolutionSize(_FireSettings.designWidth, _FireSettings.designHeight, cc.ResolutionPolicy.SHOW_ALL);

            // cc.game.pause();

            // init assets
            cc.AssetLibrary.init('res/import', { assets: 'res/raw' }, _FireSettings.rawAssets);

            var launchScene = _FireSettings.launchScene;

            // load scene
            cc.director.loadScene(launchScene, null,
                function () {
                    if (cc.sys.isBrowser) {
                        var splash = document.getElementById('splash');
                        splash.style.display = 'none';

                        // show canvas
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }

                    // play game
                    // cc.game.resume();

                    console.log('Success to load scene: ' + launchScene);
                }
            );

            // purge
            //noinspection JSUndeclaredVariable
            _FireSettings = undefined;
        };

        var option;

        if (cc.sys.isNative) {
            var txt = jsb.fileUtils.getStringFromFile("project.json");
            if (!txt) txt = jsb.fileUtils.getStringFromFile("project-runtime.json");
            if (!txt) {
                console.log('Can\'t find project.json');
                option = {};
            }
            else {
                option = JSON.parse(txt);
            }

            option.scenes = _FireSettings.scenes;
        }
        else {
            option = {
                //width: width,
                //height: height,
                id: 'GameCanvas',
                scenes: _FireSettings.scenes
            };
        }

        cc.game.run(option, onStart);
    }

    if (cc.sys.isBrowser) {
        window.onload = boot;
    }
    else if (cc.sys.isNative) {
        require('src/settings.js');
        require('src/jsb_engine.js');

        boot();
    }

})();
