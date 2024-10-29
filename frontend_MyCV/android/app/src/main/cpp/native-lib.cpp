#include <jni.h>

extern "C" JNIEXPORT jstring JNICALL
Java_com_yourpackage_name_MainActivity_stringFromJNI(JNIEnv* env, jobject) {
    return env->NewStringUTF("Hello from C++");
}
