package com.example.meudevocional

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

class DailyReminderReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent?) {
        val title = intent?.getStringExtra("title") ?: "Meu Devocional · Momento Diário"
        val message = intent?.getStringExtra("message") ?: "Hora de fazer uma pausa para o seu devocional diário com Deus."

        // Dispara a notificação visual e sonora
        NotificationHelper.showNotification(context, title, message)

        // Rearma o alarme para o próximo dia no mesmo horário
        NotificationHelper.rearmarSeAtivo(context)
    }
}
