'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                milisconds: 0
            }
        };
        _this.format = _this.format.bind(_this);
        _this.changeRanStat = _this.changeRanStat.bind(_this);
        _this.step = _this.step.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.format = _this.format.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.add = _this.add.bind(_this);
        _this.clear = _this.clear.bind(_this);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'format',
        value: function format(times) {
            return pad0(this.state.times.minutes) + ':' + pad0(this.state.times.seconds) + ':' + pad0(Math.floor(this.state.times.milisconds));
        }

        //zmieniam stan po otrzymaniu danych z buttona start i stop

    }, {
        key: 'changeRanStat',
        value: function changeRanStat(state) {
            this.setState({
                running: state
            });
        }

        //metoda ktora ma ustawic state na zera i bedzie wyslana poprzez propsy do dziecka

    }, {
        key: 'reset',
        value: function reset() {
            this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    milisconds: 0
                }
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            this.watch = setInterval(function () {
                return _this2.step();
            }, 10);
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var times = this.state.times;
            times.milisconds += 1;
            if (times.milisconds >= 100) {
                times.seconds += 1;
                times.milisconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }

            this.setState({
                times: times
            });
        }
    }, {
        key: 'add',
        value: function add() {

            if (!this.running) {
                var ul = document.querySelector('.results');
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(this.format(this.times)));
                ul.appendChild(li);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var ul = document.querySelector('.results');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'resultsList' },
                    React.createElement(
                        'h1',
                        null,
                        'Best Results'
                    ),
                    React.createElement('ul', { className: 'results' })
                ),
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'nav',
                        { className: 'main' },
                        React.createElement(
                            'div',
                            { className: 'stopwatch' },
                            this.format(this.state.times)
                        ),
                        React.createElement(
                            'div',
                            { className: 'buttons-main' },
                            React.createElement(StartButton, { isRunning: this.changeRanStat }),
                            React.createElement(StopButton, { isRunning: this.changeRanStat })
                        )
                    ),
                    React.createElement(
                        'nav',
                        { className: 'buttons-list' },
                        React.createElement(ResetButton, { action: this.reset }),
                        React.createElement(AddToListButton, { action: this.add }),
                        React.createElement(ClearListButton, { action: this.clear })
                    )
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var StartButton = function (_React$Component2) {
    _inherits(StartButton, _React$Component2);

    function StartButton(props) {
        _classCallCheck(this, StartButton);

        var _this3 = _possibleConstructorReturn(this, (StartButton.__proto__ || Object.getPrototypeOf(StartButton)).call(this, props));

        _this3.state = {
            running: false
        };

        _this3.start = _this3.start.bind(_this3);

        return _this3;
    }

    //zmienia w propsach wlasciwosc running na true


    _createClass(StartButton, [{
        key: 'clickStart',
        value: function clickStart() {
            this.props.isRunning(true);
        }

        //startuje zegar przez wykonie metody clickStart

    }, {
        key: 'start',
        value: function start() {
            if (!this.state.running) {
                this.clickStart();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '#',
                    className: 'button',
                    onClick: this.start
                },
                'Start'
            );
        }
    }]);

    return StartButton;
}(React.Component);

var StopButton = function (_React$Component3) {
    _inherits(StopButton, _React$Component3);

    function StopButton(props) {
        _classCallCheck(this, StopButton);

        var _this4 = _possibleConstructorReturn(this, (StopButton.__proto__ || Object.getPrototypeOf(StopButton)).call(this, props));

        _this4.state = {
            running: true
        };
        _this4.stop = _this4.stop.bind(_this4);
        return _this4;
    }

    //zmienia wlasciwosc running na false


    _createClass(StopButton, [{
        key: 'clickStop',
        value: function clickStop() {
            this.props.isRunning(false);
        }

        //stopuje zegar przez wykonanie metody clickStop

    }, {
        key: 'stop',
        value: function stop() {
            this.clickStop();
            clearInterval(this.watch);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '#',
                    className: 'button',
                    onClick: this.stop
                },
                'Stop'
            );
        }
    }]);

    return StopButton;
}(React.Component);

var ResetButton = function (_React$Component4) {
    _inherits(ResetButton, _React$Component4);

    function ResetButton() {
        _classCallCheck(this, ResetButton);

        return _possibleConstructorReturn(this, (ResetButton.__proto__ || Object.getPrototypeOf(ResetButton)).apply(this, arguments));
    }

    _createClass(ResetButton, [{
        key: 'render',


        //tylko sobie renderuje button a do onClick przekazuje jako propsy akcje. dzieki temu po kliknieciu wykona sie metoda reset i wyzeruje sie zegar
        value: function render() {
            return React.createElement(
                'a',
                { href: '#',
                    className: 'button',
                    onClick: this.props.action
                },
                'Reset Stoper'
            );
        }
    }]);

    return ResetButton;
}(React.Component);

var AddToListButton = function (_React$Component5) {
    _inherits(AddToListButton, _React$Component5);

    function AddToListButton() {
        _classCallCheck(this, AddToListButton);

        return _possibleConstructorReturn(this, (AddToListButton.__proto__ || Object.getPrototypeOf(AddToListButton)).apply(this, arguments));
    }

    _createClass(AddToListButton, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '#',
                    className: 'button',
                    onClick: this.props.action
                },
                'Add To List'
            );
        }
    }]);

    return AddToListButton;
}(React.Component);

var ClearListButton = function (_React$Component6) {
    _inherits(ClearListButton, _React$Component6);

    function ClearListButton() {
        _classCallCheck(this, ClearListButton);

        return _possibleConstructorReturn(this, (ClearListButton.__proto__ || Object.getPrototypeOf(ClearListButton)).apply(this, arguments));
    }

    _createClass(ClearListButton, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'a',
                { href: '#',
                    className: 'button',
                    onClick: this.props.action
                },
                'Reset Times List'
            );
        }
    }]);

    return ClearListButton;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
