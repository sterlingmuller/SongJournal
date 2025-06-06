package expo.modules.shake

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoShakeModule : Module(), SensorEventListener {
    private var sensorManager: SensorManager? = null
    private val SHAKE_THRESHOLD = 2.4f

    override fun definition() = ModuleDefinition {
        Name("ExpoShake")
        Events("onShake")

        Function("startShakeDetection") { ->
            val context = appContext.reactContext
            if (context != null) {
                sensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
                sensorManager?.registerListener(
                    this@ExpoShakeModule,
                    sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),
                    SensorManager.SENSOR_DELAY_UI
                )
            }
            return@Function null
        }

        Function("stopShakeDetection") { ->
            sensorManager?.unregisterListener(this@ExpoShakeModule)
            sensorManager = null
            return@Function null
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event?.sensor?.type == Sensor.TYPE_ACCELEROMETER) {
            val x = event.values[0] / SensorManager.GRAVITY_EARTH
            val y = event.values[1] / SensorManager.GRAVITY_EARTH
            val z = event.values[2] / SensorManager.GRAVITY_EARTH
            val gForce = Math.sqrt((x * x + y * y + z * z).toDouble())

            if (gForce > SHAKE_THRESHOLD) {
                sendEvent("onShake", mapOf<String, Any>())
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    private fun cleanup() {
        sensorManager?.unregisterListener(this@ExpoShakeModule)
        sensorManager = null
    }
}