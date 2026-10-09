package com.example.meudevocional

import android.app.Application
import android.system.Os
import android.util.Log

class MeuDevocionalApp : Application() {

    companion object {
        private const val TAG = "MeuDevocionalApp"

        init {
            try {
                // Instrui as bibliotecas gráficas Mesa/EGL a operarem em modo software
                // prevenindo tentativas de abertura de nós DRM inexistentes (/dev/dri/renderD*) em contêineres/emuladores
                Os.setenv("LIBGL_ALWAYS_SOFTWARE", "1", true)
                Os.setenv("MESA_LOADER_DRIVER_OVERRIDE", "swrast", false)
            } catch (t: Throwable) {
                Log.w(TAG, "Configuração de ambiente gráfico ignorada: ${t.message}")
            }
        }
    }

    override fun onCreate() {
        super.onCreate()
        try {
            Os.setenv("LIBGL_ALWAYS_SOFTWARE", "1", true)
            Os.setenv("MESA_LOADER_DRIVER_OVERRIDE", "swrast", false)
        } catch (t: Throwable) {
            Log.w(TAG, "Configuração no onCreate ignorada: ${t.message}")
        }
    }
}
