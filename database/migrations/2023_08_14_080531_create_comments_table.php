<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->uuid('id')->unique()->primary();
            $table->text('body');
            $table->boolean('is_approved')->default(false);

            // foreign keys
            $table->foreignUuid('post_id')->references('id')->on('posts')->cascadeOnDelete();
            $table->foreignUuid('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->timestamps();
        });

        // parent relation
        Schema::table('comments', function (Blueprint $table) {
            $table->foreignUuid('parent_id')->references('id')->on('posts')->nullable()->default(null)->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
