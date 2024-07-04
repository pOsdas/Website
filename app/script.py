from flask import Flask, render_template, request, jsonify
import time
import threading

app = Flask(__name__)

sec, mins, hour = 0, 0, 0
int_id = None
timer_thread = None
timer_running = False
timer_lock = threading.Lock()


def update_time():
    global sec, mins, hour
    while timer_running:
        time.sleep(1)
        sec += 1
        if sec == 60:
            sec = 0
            mins += 1
        if mins == 60:
            mins = 0
            hour += 1


def start_timer():
    global int_id, timer_thread, timer_running
    if timer_running:
        return
    int_id = time.time()
    timer_running = True
    timer_thread = threading.Thread(target=update_time)
    timer_thread.start()


def stop_timer():
    global int_id, timer_running
    if not timer_running:
        return
    timer_running = False
    if timer_thread:
        timer_thread.join()
    int_id = None


def reset_timer():
    global int_id, sec, mins, hour, timer_running
    stop_timer()
    with timer_lock:
        sec, mins, hour = 0, 0, 0


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start():
    start_timer()
    print("Starting timer")
    return jsonify({'status': 'success'})


@app.route('/stop', methods=['POST'])
def stop():
    print("Stopping timer")
    stop_timer()
    return jsonify({'status': 'success'})


@app.route('/reset', methods=['POST'])
def reset():
    print("Resetting timer")
    reset_timer()
    return jsonify({'status': 'success'})


@app.route('/get_time', methods=['GET'])
def get_time():
    print(f"Getting time: {hour}:{mins}:{sec}")
    return jsonify({'hour': hour, 'mins': mins, 'sec': sec})


@app.route('/set_time', methods=['POST'])
def set_time():
    global sec, mins, hour
    data = request.json
    with timer_lock:
        sec = data.get('sec', 0)
        mins = data.get('min', 0)
        hour = data.get('hour', 0)
    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True)
