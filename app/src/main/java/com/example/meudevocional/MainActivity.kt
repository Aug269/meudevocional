package com.example.meudevocional

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.RenderProcessGoneDetail
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.enableEdgeToEdge
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import java.io.File

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Pré-cria os diretórios esperados pelo Chromium para evitar erros de enumeração do SimpleCache
        try {
            val cacheBase = File(cacheDir, "WebView/Default/HTTP Cache/Code Cache")
            File(cacheBase, "js").mkdirs()
            File(cacheBase, "wasm").mkdirs()
        } catch (_: Exception) {}

        // Inicializa o canal de notificações locais para lembretes do devocional
        NotificationHelper.criarCanalNotificacao(this)

        initWebView()

        // Suporte ao botão voltar do Android
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (::webView.isInitialized && webView.canGoBack()) {
                    webView.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })
    }

    private fun initWebView() {
        webView = WebView(this).apply {
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            setBackgroundColor(Color.parseColor("#F6F5F1"))

            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                allowFileAccess = true
                allowContentAccess = true
                cacheMode = WebSettings.LOAD_DEFAULT
                useWideViewPort = true
                loadWithOverviewMode = true
                displayZoomControls = false
                builtInZoomControls = false
            }

            webChromeClient = WebChromeClient()

            addJavascriptInterface(object {
                @android.webkit.JavascriptInterface
                fun getApiKey(): String = BuildConfig.GEMINI_API_KEY

                @android.webkit.JavascriptInterface
                fun isNativeApp(): Boolean = true

                @android.webkit.JavascriptInterface
                fun scheduleDailyReminder(hour: Int, minute: Int, title: String, message: String): Boolean {
                    NotificationHelper.scheduleDailyReminder(this@MainActivity, hour, minute, title, message)
                    return true
                }

                @android.webkit.JavascriptInterface
                fun cancelDailyReminder(): Boolean {
                    NotificationHelper.cancelDailyReminder(this@MainActivity)
                    return true
                }

                @android.webkit.JavascriptInterface
                fun showImmediateNotification(title: String, message: String): Boolean {
                    NotificationHelper.showNotification(this@MainActivity, title, message)
                    return true
                }

                @android.webkit.JavascriptInterface
                fun hasNotificationPermission(): Boolean {
                    return NotificationHelper.hasNotificationPermission(this@MainActivity)
                }

                @android.webkit.JavascriptInterface
                fun requestNotificationPermission() {
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.TIRAMISU) {
                        runOnUiThread {
                            requestPermissions(arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 101)
                        }
                    }
                }
            }, "AndroidBridge")

            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                    return false
                }

                override fun onRenderProcessGone(view: WebView?, detail: RenderProcessGoneDetail?): Boolean {
                    // Evita encerramento do app e recria a WebView se o processo de renderização for reciclado
                    try {
                        (view?.parent as? ViewGroup)?.removeView(view)
                        view?.destroy()
                        initWebView()
                    } catch (_: Exception) {}
                    return true
                }

                override fun onReceivedError(
                    view: WebView?,
                    request: WebResourceRequest?,
                    error: WebResourceError?
                ) {
                    super.onReceivedError(view, request, error)
                }

                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    if (BuildConfig.GEMINI_API_KEY.isNotEmpty()) {
                        view?.evaluateJavascript(
                            "window.GEMINI_API_KEY = '${BuildConfig.GEMINI_API_KEY}'; window.FIREBASE_API_KEY = '${BuildConfig.GEMINI_API_KEY}';",
                            null
                        )
                    }
                }
            }

            loadUrl("file:///android_asset/index.html")
        }

        setContentView(webView)

        // Ajusta insets de janela para bordas e barra de navegação do sistema
        ViewCompat.setOnApplyWindowInsetsListener(webView) { view, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            view.setPadding(0, systemBars.top, 0, systemBars.bottom)
            insets
        }
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        webView.destroy()
    }
}
