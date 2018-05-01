class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                milisconds: 0
            }
        };
        this.format = this.format.bind(this);
        this.changeRanStat = this.changeRanStat.bind(this);
        this.step = this.step.bind(this);
        this.calculate = this.calculate.bind(this);
        this.format = this.format.bind(this);
        this.reset = this.reset.bind(this);
        this.add = this.add.bind(this);
        this.clear = this.clear.bind(this);
    }

    format(times) {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.milisconds))}`;
    }

    //zmieniam stan po otrzymaniu danych z buttona start i stop
    changeRanStat(state) {
        this.setState({
            running: state
        });
    }

    //metoda ktora ma ustawic state na zera i bedzie wyslana poprzez propsy do dziecka
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                milisconds: 0
            }
        });
    }

    componentDidUpdate() {
        this.watch = setInterval(() => this.step(), 10);
    }

    step() {
        if (! this.state.running) return;
        this.calculate();
    }

    calculate() {
        const times = this.state.times;
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
        })
    }

    add() {

        if (! this.running) {
            let ul = document.querySelector('.results');
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(this.format(this.times)));
            ul.appendChild(li);
        }
    }

    clear() {
        let ul = document.querySelector('.results');
        while(ul.firstChild)
            ul.removeChild(ul.firstChild);
    }



    render() {
        return (
            <div className="container">
                <div className="resultsList">
                    <h1>Best Results</h1>
                    <ul className="results"></ul>
                </div>
                <div className="controls">
                    <nav className="main">
                        <div className="stopwatch">{this.format(this.state.times)}</div>
                        <div className="buttons-main">
                            {/*renderuje buttony do isRunning przekazywane jest true lub false w zaleznosci od kliknetego butona*/}
                            <StartButton isRunning={this.changeRanStat} />
                            <StopButton isRunning={this.changeRanStat} />
                        </div>
                    </nav>
                    <nav className="buttons-list">
                        {/*renderuje button do resetu a do wlasciwiosci action podpinam funkcje do resetowania stanu.
                        do akction odwoluje sie potem w komponencie ResetButton. pozostale dzialaja tak samo*/}
                        <ResetButton action={this.reset} />
                        <AddToListButton action={this.add} />
                        <ClearListButton action={this.clear} />
                    </nav>
                </div>
            </div>
        )
    }
}

class StartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false
        };

        this.start = this.start.bind(this);

    }

    //zmienia w propsach wlasciwosc running na true
    clickStart() {
        this.props.isRunning(true);
    }

    //startuje zegar przez wykonie metody clickStart
    start() {
        if (! this.state.running) {
            this.clickStart();
        }
    }

    render() {
        return (
            <a href='#'
               className="button"
               onClick={this.start}
            >Start</a>
        )
    }
}

class StopButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: true
        };
        this.stop = this.stop.bind(this);
    }

    //zmienia wlasciwosc running na false
    clickStop() {
        this.props.isRunning(false);
    }

    //stopuje zegar przez wykonanie metody clickStop
    stop() {
        this.clickStop();
        clearInterval(this.watch);
    }

    render() {
        return (
            <a href='#'
               className="button"
               onClick={this.stop}
            >Stop</a>
        )
    }
}

class ResetButton extends React.Component {

    //tylko sobie renderuje button a do onClick przekazuje jako propsy akcje. dzieki temu po kliknieciu wykona sie metoda reset i wyzeruje sie zegar
    render() {
        return (
            <a href='#'
               className="button"
               onClick={this.props.action}
            >Reset Stoper</a>
        )
    }
}

class AddToListButton extends React.Component {
    render() {
        return (
            <a href='#'
               className="button"
               onClick={this.props.action}
            >Add To List</a>
        )

    }
}

class ClearListButton extends React.Component {
    render() {
        return (
            <a href='#'
               className="button"
               onClick={this.props.action}
            >Reset Times List</a>
        )
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));